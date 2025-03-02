provider "aws" {
  region = "eu-west-1"
}

resource "aws_s3_bucket" "pokemon_images" {
  bucket = "pokemon-team-images"
  acl    = "private"
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
}

resource "aws_security_group" "ecs_sg" {
  vpc_id = aws_vpc.main.id
}

resource "aws_security_group_rule" "allow_http" {
  type        = "ingress"
  from_port   = 80
  to_port     = 80
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
  security_group_id = aws_security_group.ecs_sg.id
}

resource "aws_lb" "pokemon_lb" {
  name               = "pokemon-load-balancer"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.ecs_sg.id]
  subnets           = [aws_subnet.public.id]
}

resource "aws_lb_target_group" "pokemon_tg" {
  name     = "pokemon-target-group"
  port     = 3000
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id
  target_type = "ip"
}

resource "aws_lb_listener" "pokemon_listener" {
  load_balancer_arn = aws_lb.pokemon_lb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.pokemon_tg.arn
  }
}

resource "aws_rds_instance" "pokemon_db" {
  engine         = "postgres"
  instance_class = "db.t3.micro"
  allocated_storage = 20
  username      = "admin"
  password      = "securepassword"
  publicly_accessible = false
  vpc_security_group_ids = [aws_security_group.ecs_sg.id]
  skip_final_snapshot = true
}

resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "pokemon-redis"
  engine              = "redis"
  node_type           = "cache.t3.micro"
  num_cache_nodes     = 1
  parameter_group_name = "default.redis7"
}

resource "aws_ecs_cluster" "pokemon_cluster" {}

resource "aws_ecs_task_definition" "pokemon_app" {
  family                   = "pokemon-app"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "512"
  memory                   = "1024"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn

  container_definitions = jsonencode([
    {
      name  = "pokemon-app"
      image = "your-docker-image-url"
      portMappings = [{ containerPort = 3000 }]
      environment = [
        { name = "DATABASE_URL", value = "postgresql://${aws_rds_instance.pokemon_db.username}:${aws_rds_instance.pokemon_db.password}@${aws_rds_instance.pokemon_db.endpoint}/pokemon_db" },
        { name = "REDIS_URL", value = "redis://${aws_elasticache_cluster.redis.endpoint}:6379" }
      ]
    }
  ])
}

resource "aws_ecs_service" "pokemon_service" {
  name            = "pokemon-service"
  cluster         = aws_ecs_cluster.pokemon_cluster.id
  task_definition = aws_ecs_task_definition.pokemon_app.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets = [aws_subnet.public.id]
    security_groups = [aws_security_group.ecs_sg.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.pokemon_tg.arn
    container_name   = "pokemon-app"
    container_port   = 3000
  }
}
