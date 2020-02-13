# Genérale AWS.

- https://www.catalyst.net.nz/blog/cutting-our-aws-spend-half

# Fargate resources

- Safari: Amazon Fargate Quick Start Guide.
-  AWS Cloud formation master

- https://templates.cloudonaut.io/en/stable/fargate/
- https://github.com/milap-neupane/aws-cloudformation-sample/tree/master/ecs-node-app

Paramètres pour une task

- https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-taskdefinition.html
- https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ecs-taskdefinition-containerdefinitions.html#cfn-ecs-taskdefinition-containerdefinition-environment
- https://github.com/nathanpeck/aws-cloudformation-fargate

Discutions à propos de la gestion des secrets cloudformation pour fargate:

- https://github.com/aws/containers-roadmap/issues/97
- https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data.html
- https://aws.amazon.com/premiumsupport/knowledge-center/ecs-data-security-container-task/

Cloud formation practices:

- https://devopstar.com/2019/01/24/managing-aws-fargate-with-cloudformation-nested-stacks

Le code pour ceci en haut se trouve dans

- https://github.com/t04glovern/service-slayer/tree/master/cloudformation

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