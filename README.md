# thingamajig

This started as an idea to help with naming. I then took inspiration from emerging dev tooling to include a little ML.
At the same time, I am working towards my AWS SA certificate and needed a "real world" solution to consider.

The idea is that a person can connect their repo to this platform, and grant access to their repo(s). The platform then analyses their solution, considering any guidance they provide to help in this (e.g. treat as an MVC web application). The results of the analysis go into a private repository, meaning that the output is not used to augment the tooling or exposed to anyone at all. This code structure is used alongside external corpora to gain an understanding. A lightweight developer tool will be developed that enables the developer to request a new file for a specific purpose. The platform will then provide recommended names for said file (with reasons) which the developer can select from. After that, the normal PR workflow is resumed.

It's worth noting that there is a lot of "new" and "unknown" in this project. So it'll mainly be a vehicle for learning with any business value being a bonus.

## Infrastructure

### CDK (DEPRECATED)

- NB: Moved away from this, as it was just slowing me down too much. Probably should have done this earlier. Now doing all via console.
- Hard-coded to account and region, in `bin/thingamajig.ts`
- Each IDU is a Stack within the app and is declared in the lib folder. These can have sets of stacks or constructs within them.
- The named instances of these stacks are defined within `bin/thingamajig.ts`.

#### Tagging

Uses tags defined in https://github.com/ovaisoozeer/aws-config/blob/main/tagging-strategy.json
