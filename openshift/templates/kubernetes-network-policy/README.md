# Network Security Policies
[..back to OpenShift](../README.md)

Configure each project namespace with the appropriate Network Security Policy (NSP) to enable appropriate communication between projects, pods, internal k8s cluster api and the internet.


Configure each environment project namespace (DEV, TEST, PROD).

## NSP -> Development
```bash
oc project acd38d-dev
oc process -f deny-by-default.yaml | oc create --save-config=true -f -
oc process -f allow-database-port-tcp-5432.yaml -p ENV_NAME=dev | oc create --save-config=true -f -
oc process -f allow-from-openshift-ingress.yaml -p ENV_NAME=dev | oc create --save-config=true -f -
```
## NSP -> Test
```bash
oc project acd38d-test
oc process -f deny-by-default.yaml | oc create --save-config=true -f -
oc process -f allow-database-port-tcp-5432.yaml -p ENV_NAME=dev | oc create --save-config=true -f -
oc process -f allow-from-openshift-ingress.yaml -p ENV_NAME=dev | oc create --save-config=true -f -
```
## NSP -> Production
```bash
oc project acd38d-prod
oc process -f deny-by-default.yaml | oc create --save-config=true -f -
oc process -f allow-database-port-tcp-5432.yaml -p ENV_NAME=dev | oc create --save-config=true -f -
oc process -f allow-from-openshift-ingress.yaml -p ENV_NAME=dev | oc create --save-config=true -f -
```

If at any time an update needs to be made to the NSP, update the templates and run the `apply` command.

Enable the **Service Account** to pull images from external sources.

## NSP to allow each env to access tools.

```bash
oc project acd38d-dev
oc policy add-role-to-user system:image-puller system:serviceaccount:$(oc project --short):default -n acd38d-tools

oc project acd38d-test
oc policy add-role-to-user system:image-puller system:serviceaccount:$(oc project --short):default -n acd38d-tools

oc project acd38d-prod
oc policy add-role-to-user system:image-puller system:serviceaccount:$(oc project --short):default -n acd38d-tools
```
