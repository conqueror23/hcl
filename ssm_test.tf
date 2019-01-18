resource "aws_db_instance" "default" {
  allocated_storage    = 10
  storage_type         = "gp2"
  engine               = "mysql"
  engine_version       = "5.7.16"
  instance_class       = "db.t2.micro"
  name                 = "mydb"
  username             = "foo"
  password             = "123"
  db_subnet_group_name = "my_database_subnet_group"
  parameter_group_name = "default.mysql5.7"
}

resource "aws_ssm_parameter" "common_dev_web_url" {
  name  = "/common/dev/web_url"
  type  = "String"
  value = "https://www-dev.example.com"
}
resource "aws_ssm_parameter" "_common_dev_service_url" {
  name  = "/common/dev/service_url"
  type  = "String"
  value = "https://ids-dev.example.com"
}

resource "aws_ssm_parameter" "common_dev_other_keys" {
  name  = "/common/dev/web_url"
  type  = "String"
  value = "any_value"
}

resource "aws_ssm_parameter" "service_1_dev_db_user" {
  name  = "/service_1/dev/db_user"
  type  = "String"
  value = "service_1-dbuser"
}
resource "aws_ssm_parameter" "service_1_dev_dbpassword" {
  name  = "/service_1/dev/dbpassword"
  type  = "String"
  value = "MASK"
}
resource "aws_ssm_parameter" "service_1_dev_timeout" {
  name  = "/service_1/dev/timeout"
  type  = "String"
  value = "100"
}
