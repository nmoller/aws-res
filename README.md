# Beanstalk - ECS

## Comment from reddit
I wouldn’t do that. If you deploy an elastic beanstalk resource using Cloudformation then the elastic beanstalk service will automatically create that nested stack for you. If you try and do it manually then you won’t be using beanstalk and won’t get the benefits of the management console.

Instead I would use Cloudformation to define an AWS::ElasticBeanstalk::Application as document here: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-beanstalk.html

And an Environment as seen here: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-beanstalk-environment.html

Actually, the whole basic structure you need is here: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/quickref-elasticbeanstalk.html

## Resources

- https://github.com/Tulkis/aws-ebs-moodle
- https://github.com/rennokki/laravel-aws-eb
- https://github.com/aws-samples/eb-php-wordpress
- https://support.tideways.com/article/88-install-on-aws-elastic-beanstalk
- https://aws.amazon.com/about-aws/whats-new/2019/10/aws-elastic-beanstalk-adds-support-for-php-7-3-and-net-core-3-0/
- https://github.com/vanderbilt-redcap/redcap-aws-cloudformation/blob/master/02-rc-elasticbeanstalk.yaml

- https://github.com/bbcarchdev/res_moodle_stack
- https://github.com/netbears/php-mysql-ecs/blob/master/cloudformation-template.yaml
- https://github.com/cfn-modules/docs
- https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_data_volumes.html
- https://www.unicon.net/insights/blogs/aws-ecs-auto-scaling-part-1

- https://github.com/stelligent/mu
- https://github.com/nathanpeck/awesome-ecs

- https://www.1strategy.com/blog/2017/04/18/cloudformation-visualizing-cross-stack-references/

- https://bref.sh/docs/

# Moodle
- https://github.com/catalyst/moodle-tool_objectfs
- https://objectivefs.com/
- https://danielneis.github.io/moodleparadesenvolvedores/
- https://danielneis.github.io/how-to-use-moodle-27/chapter4.html

# Cloudformation templates



## Utilisation sceptre

- https://github.com/Sceptre/sceptre
- https://sceptre.cloudreach.com/2.2.1/docs/get_started.html

```
docker run -it --rm -v $(pwd):/project \
-w /project -u 1000:1000 --entrypoint='' \
cloudreach/sceptre:latest sh

sceptre new project moodle
git clone https://github.com/aws-samples/aws-refarch-moodle.git.

# modifier cp commande pour avoir bonne structure
cp -r aws-refarch-moodle/templates/ moodle/templates/
mv templates/ templates01
mv templates01/templates templates
rm -rf templates01/
```
