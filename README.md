# Example Project for unintended change events in Bryntum Gantt

## Issue Description
When an event is updated via the redux store all other events also receive a change event even though they were not changed. This should not happen because the syncDataOnLoad for the stores is set to true.
## How to Reproduce
After starting the project you can find a button in the top left corner which triggers an update for the event with id 1.
Then you can see in the console that not only for this one event but for all events in the gantt a change event is fired. For each event the startDate, endDate and duration property is marked as changed even though they are identical to the oldValue.
## Additional Information
We saw this behavior also in our real bryntum project. There only the startDate and endDate were recognized as changed properties.
In this example project for some reason also the duration property is affected. While for other properties the syncDataOnLoad seems to work correctly.
