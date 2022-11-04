# Green Location

Enable users to dynamically choose location variable based on current grid intensity by creating an extension task that queries the Carbon Aware SDK for you.

The extension will set an output variable `bestLocation`. This variable can directly be used by ARM deployment task as an input for the Resource location. If you are defining multi-job pipeline, you can use the below code to set the location input variable.

```$[ dependencies.JOB_NAME.outputs['GREEN_LOCATION_TASK_NAME.bestLocation'] ]```