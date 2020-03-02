# Préparer instance pour moodle

Pour tester l'installation de packages 
```
docker run -it --rm amazonlinux bash
``` 

- https://assets.moodlemoot.org/sites/112/20190926064806/DockerMDKPresentation.pdf

Installation des dépendences
- https://gist.github.com/heathdutton/98b00aa90be2ef80c80a5090456c329b
- https://blog.duaneleem.com/amazon-linux-2-apache-2-4-php-7-3/

S'il y des problèmes avec l'installation d'oci8:
- https://unix.stackexchange.com/questions/256083/installing-oci8-php-extension
- https://blogs.oracle.com/linux/connect-php-72-to-oracle-database-12c-using-oracle-linux-yum-server

Voir aussi:
- https://github.com/aws-samples/aws-refarch-moodle/blob/77196581f70eabb8db50f393ebee4363f5f5f49d/templates/04-web.yaml#L654

- https://github.com/ELRuncho/MoodleCloudFormation
- https://github.com/aws-samples/aws-refarch-moodle
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/amazon-linux-ami-basics.html
- https://cloudonaut.io/migrating-to-amazon-linux-2/
- https://github.com/suzryo/aws/blob/master/CFn/ec2-wordpress/cloudfront-nginx-wordpress-al2/sample-6.yaml

## Autoscaling

- https://medium.com/@lvthillo/aws-auto-scaling-based-on-memory-utilization-in-cloudformation-159676b6f4d6

Attention au problèmes qui pourrait venir avec EFS (merci Matt Porrit de Catalyst). Il serait une très mauvaise idée de mettre les sessions dans une share de ce genre.
- https://ops.tips/blog/limits-aws-efs-nfs-locks/ (ça a été augmenté... )
- https://aws.amazon.com/about-aws/whats-new/2018/11/amazon-elastic-file-system-now-supports-512-locks-per-file/ (cependant IBM ne le note pas )
- https://www.ibm.com/support/pages/ibm-mq-considerations-efs-aws

## Préparer serveur

- https://acloud.guru/forums/aws-certified-solutions-architect-associate/discussion/-LJAUJr86gq-tYkwzB7M/efs_nfs_mount_times_out_on_ec2
- https://github.com/boozallen/devsecops-example-helloworld/blob/master/cloud-formation/helloworld/app/main.yml
- https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ssm-parameter.html

- Installation des packages
- Configuration

Scripts pour set-ups:

https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-init.html

## Installer moodle

Pour injecter ce dont on a besoin dans l'instance:

- https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/dynamic-references.html
- https://binx.io/blog/2017/10/25/deploying-private-key-pairs-with-aws-cloudformation/
- https://github.com/aws-cloudformation/aws-cloudformation-coverage-roadmap/issues/179

Pour la clé, on pourrait commencer avec un rôle pour un bucket et donner accès aux objets dans un bucket... il y aurait du code manuel cependant ça donne un peu de sécurité.

Moodle use-case:

- Injecter clé pour bitbucket
- git clone

  - moodle
  - configphp
