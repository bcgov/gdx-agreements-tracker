# Deployments

## Deploying with Kustomize

### Deploy Images

- Create a kustomization.yaml
- Change the namespace to match your namespace
- create a patch.yaml file if required.
- run `oc apply -k kustomization.yaml`


```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- github.com/bcgov/gdx-agreements-tracker/deployments/kustomize/overlays/openshift/images
namespace: 12345-tools
patchesStrategicMerge:
- patch.yaml
```