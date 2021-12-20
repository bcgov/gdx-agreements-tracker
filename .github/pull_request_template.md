# Pull Request Considerations

Although some of these things can only be done after merged, please ensure all items have been considered when doing pull requests.

* Updated README.md(s) for new functionality or changes.
* Have you added an env file? 
    * Did you update Openshift secrets/config maps in repository?
    * Did you added this env variable explanation in the appropriate README.md file.
* Have you changed any Openshift configurations/templates?
    * Have you applied changes.
* Did changes trigger Openshift img re builds.
    * Check Openshift instance of application to ensure your changes are working.
