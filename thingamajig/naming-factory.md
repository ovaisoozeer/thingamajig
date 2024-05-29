A note on the thinking behind the naming helper:

| Scope        | UI Surface  | Usage             | Format                                   |
| ------------ | ----------- | ----------------- | ---------------------------------------- |
| App          | n/a         | All               | context                                  |
| Stack        | CF          | Logical hierarchy | context_container                        |
| Nested Stack | CF          | Logical hierarchy | context_container_component              |
| Resource     | AWS service | Direct            | context_container\_[component\_]resource |
