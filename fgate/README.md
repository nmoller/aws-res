# Genérale AWS.

- https://www.catalyst.net.nz/blog/cutting-our-aws-spend-half
- https://stackoverflow.com/questions/45027830/cant-delete-aws-internet-gateway
- https://moodle.org/mod/forum/discuss.php?d=340822
- https://github.com/EduardoKrausME/moodledata-to-AWS

- https://prasaddomala.com/blog/how-to-enable-ssl-on-aws-elastic-load-balancer-using-openssl-self-signed-certificates

# Fargate resources

- Safari: Amazon Fargate Quick Start Guide.
-  AWS Cloud formation master

- https://templates.cloudonaut.io/en/stable/fargate/
- https://github.com/milap-neupane/aws-cloudformation-sample/tree/master/ecs-node-app

- https://answerstu.com/question-66754

Paramètres pour une task

- https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-taskdefinition.html
- https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ecs-taskdefinition-containerdefinitions.html#cfn-ecs-taskdefinition-containerdefinition-environment
- https://github.com/nathanpeck/aws-cloudformation-fargate

Discutions à propos de la gestion des secrets cloudformation pour fargate:

- https://github.com/aws/containers-roadmap/issues/97
- https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data.html
- https://aws.amazon.com/premiumsupport/knowledge-center/ecs-data-security-container-task/
- https://github.com/tonyfromundefined/prisma-aws-cloudformation/blob/master/prisma.aurora.serverless.yml

Cloud formation practices:

- https://theburningmonk.com/cloudformation-ref-and-getatt-cheatsheet/
- https://devopstar.com/2019/01/24/managing-aws-fargate-with-cloudformation-nested-stacks

Le code pour ceci en haut se trouve dans

- https://github.com/t04glovern/service-slayer/tree/master/cloudformation

## Connexion au container

- https://github.com/pottava/fargate-shell/tree/master/serverless-bastion
- https://ig.nore.me/2018/07/serverless-bastions-on-demand/
- https://docs.amazonaws.cn/en_us/AmazonECS/latest/developerguide/instance-connect.html

## Moodle FS

- https://docs.moodle.org/dev/File_System_API
- https://github.com/catalyst/moodle-tool_objectfs

## Outils pour php

Image avec beaucoup d'outils pour code php:

- https://github.com/jakzal/phpqa

Exemple d'utilisation
```
# lint du code php dans le dossier src:
 docker run -it --rm -v $(pwd):/opt/app -w /opt/app \
 jakzal/phpqa:php7.2 \
 phplint src --no-cache

 docker run -it --rm -v $(pwd):/opt/app -w /opt/app \
 jakzal/phpqa:php7.2 \
 phpstan analyse src/Controller -l 4
 ```