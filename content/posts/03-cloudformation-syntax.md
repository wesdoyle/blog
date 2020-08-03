---
title: "CloudFormation Template Syntax"
description: "Quick reference for CF template syntax"
date: 2019-12-03
---

Quick reference for basic CF template syntax, the use of parameters, mappings, resources, and outputs

```yaml
Parameters:
  Ec2Type:
    Type: String
    Default: t2.micro
      AllowedValues:  # Creates drop-down in template upload wizard
        - t2.micro
        - m1.small
        - m1.large
    Description:
      EC2 Instance Type

Mappings:
  SomeRegionMapping:
    us-east-1:
      foo: bar
    us-west-1:
      bar: quux

Resources:
  Ec2Instance:
    Type: AWS::EC2::Instance
    Properties:
    InstanceType: !Ref Ec2Type # Intrinsic function `!Ref` points to template Parameters
    ImageId: ami-467ca739
    Tags:
      - Key: Env
      Value: Development
      - Key: Name
      Value: !Ref AWS::Region # Intrinsic function `!Ref` with Pseudo Parameter
      - Key: SomeMappedValue
        Value: !FindInMap # Intrinsic function references template Mappings
        - SomeRegionMapping
        - !Ref AWS::Region
        - foo # In this template would map to value 'bar'
    SecurityGroups:
    - !Ref BasicSecurityGroup

  BasicSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
    GroupDescription: Enable SSH from anywhere
    SecurityGroupIngress:
    - IpProtocol: tcp
    FromPort: 22
    ToPort: 22
    CidrIp: 0.0.0.0/0

Outputs:
  ServerDns:
    Value: !GetAtt # Intrinsic function `!GetAtt` refs template resource
    - Ec2Instance # From template resource
    - PublicDnsName # Public DNS for resource 
```
