# Préparer instance pour moodle

- https://github.com/ELRuncho/MoodleCloudFormation
- https://github.com/aws-samples/aws-refarch-moodle
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/amazon-linux-ami-basics.html
- https://cloudonaut.io/migrating-to-amazon-linux-2/
- https://github.com/suzryo/aws/blob/master/CFn/ec2-wordpress/cloudfront-nginx-wordpress-al2/sample-6.yaml

## Autoscaling

- https://medium.com/@lvthillo/aws-auto-scaling-based-on-memory-utilization-in-cloudformation-159676b6f4d6

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
