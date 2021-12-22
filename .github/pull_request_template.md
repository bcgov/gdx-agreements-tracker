# Pull Request Considerations

Although some of these things can only be done after merged, please ensure all items have been considered when doing pull requests.

* Updated README.md(s) for new functionality or changes.
* Did you update .env / create a new environment variable?
    * Did you update/create an explanation in the appropriate README.md file for it?
    * Did you make/update an Openshift configmap/secret template for it?
* Have you changed any Openshift configurations/templates?
    * Did you execute the appropriate `oc process` command on the template to put the configmap/secret in openshift?
* Did changes trigger Openshift image rebuilds?
    * Check Openshift instance of application to ensure your changes are working.
