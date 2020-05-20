# EFS

Voir diagramme

https://docs.aws.amazon.com/efs/latest/ug/accessing-fs.html

### Création de resource
Au préalable, créer instance pour avoir les composantes prêts pour la création du EFS. Ça donne:

` fs-90a7227d.efs.ca-central-1.amazonaws.com `

on se connecte sur l'instance et l'on mounte le système de fichiers:

```
[root@ip-10-192-10-37 ~]# mkdir /test
[root@ip-10-192-10-37 ~]# sudo mount -t nfs4 -o nfsvers=4.1,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2 fs-90a7227d.efs.ca-central-1.amazonaws.com:/ /test
[root@ip-10-192-10-37 ~]# df 
Filesystem                                          1K-blocks    Used        Available Use% Mounted on
devtmpfs                                               485468       0           485468   0% /dev
tmpfs                                                  503480       0           503480   0% /dev/shm
tmpfs                                                  503480     408           503072   1% /run
tmpfs                                                  503480       0           503480   0% /sys/fs/cgroup
/dev/xvda1                                            8376300 2265008          6111292  28% /
tmpfs                                                  100696       0           100696   0% /run/user/1000
fs-90a7227d.efs.ca-central-1.amazonaws.com:/ 9007199254739968       0 9007199254739968   0% /test
[root@ip-10-192-10-37 ~]# cd test
-bash: cd: test: No such file or directory
[root@ip-10-192-10-37 ~]# cd /test
[root@ip-10-192-10-37 test]# echo "content" > test.txt
[root@ip-10-192-10-37 test]# ls
test.txt
```

Pas de problèmes pour effacer les stacks... j'avais peur de que certains choses du stack efs dependaient du stack web.