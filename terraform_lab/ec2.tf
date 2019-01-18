provider "aws" {
  access_key = "AKIAISQ4B4RAJVBP4ILQ"
  secret_key = "Vf/th+gPNOB6h9xPCIt94qNBDFe8MILf/n/1GvT3"
  region     = "us-east-1"
}

resource "aws_instance" "example" {
  ami           = "ami-2757f631"
  instance_type = "t2.micro"
}
