# Test de charge

https://www.blazemeter.com/blog/make-use-of-docker-with-jmeter-learn-how

https://moodle.org/mod/forum/discuss.php?d=377231


```
docker run \
  --volume "$(pwd)":/opt/jmeter \
 justb4/jmeter:5.1.1 \
  -t /opt/jmeter/testplan_202006010932_2867.jmx \
  -pusersfile /opt/jmeter/users_202006010932_8646.csv \
  -l /tmp/result_001.jtl \
  -j /tmp/jmeter_001.log


# créer dossier vide pour les résultats res01

docker run   --volume "$(pwd)":/opt/jmeter  \
--name jmtest \
justb4/jmeter:5.1.1 -n \
-t /opt/jmeter/testplan_202006010932_2867.jmx \
-Jusersfile=/opt/jmeter/users_202006010932_8646.csv \
-l /opt/jmeter/result_001.jtl \
-j /opt/jmeter/jmeter_001.log -e -o /opt/jmeter/res01

docker run   --volume "$(pwd)":/opt/jmeter  \
--name jmtest \
justb4/jmeter:5.1.1 -n \
-t /opt/jmeter/testplan_202006010932_2867.jmx \
-Jusersfile=/opt/jmeter/users_202006010932_8646.csv \
-Jthroughput=200 \
-Jusers=100 \
-l /opt/jmeter/result_003.jtl \
-j /opt/jmeter/jmeter_003.log -e -o /opt/jmeter/res03

# medium

docker run   --volume "$(pwd)":/opt/jmeter  \
--name jmtest --rm \
justb4/jmeter:5.1.1 -n \
-t /opt/jmeter/testplan_202006020808_5305.jmx \
-Jusersfile=/opt/jmeter/users_202006020808_6291.csv \
-Jthroughput=200 \
-l /opt/jmeter/result_003.jtl \
-j /opt/jmeter/jmeter_003.log -e -o /opt/jmeter/res03

docker run   --volume "$(pwd)":/opt/jmeter  \
--name jmtest --rm \
justb4/jmeter:5.1.1 -n \
-t /opt/jmeter/testplan_202006021305_4501.jmx \
-Jusersfile=/opt/jmeter/users_202006021305_1777.csv \
-l /opt/jmeter/result_004.jtl \
-j /opt/jmeter/jmeter_004.log -e -o /opt/jmeter/res04
  ```

## Sac 

https://stackoverflow.com/questions/31378039/php-session-store-error-using-memcached