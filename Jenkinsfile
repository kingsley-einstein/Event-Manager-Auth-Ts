pipeline {
  agent any
  environment {
    PGPASSWORD = 'password'
  }
  stages {
    stage("Copy .env.jenkins to new location with new name") {
      steps {
        bat 'copy .env.jenkins .env'
      }
    }
    stage("Install dependencies") {
      steps {
        bat 'npm install'
      }
    }
    stage("Create DB") {
      steps {
        bat 'psql -h 127.0.0.1 -p 5432 -c "DROP DATABASE IF EXISTS jenkins" -U postgres'
        bat 'psql -h 127.0.0.1 -p 5432 -c "CREATE DATABASE jenkins" -U postgres'
      }
    }
    stage("Run test") {
      steps {
        bat 'npm test'
      }
    }
  }
}