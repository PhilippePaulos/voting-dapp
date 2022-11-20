# Voting
> 
```

```





### 📡 Networks

The contract has been deployed to:
* **Network 5**: `0x5312bB8D0045fF340FAE3b20Fa8138e5B3C1999b`
* **Network 5777**: `0xa36064a5106077bAC0B7bb69B311693744e379c2`



### 🎟 Events


#### OwnershipTransferred
| Name | Indexed | Type |
|:-:|:-:|:-:|
| previousOwner | `true` | `address` |
| newOwner | `true` | `address` |


#### ProposalRegistered
| Name | Indexed | Type |
|:-:|:-:|:-:|
| proposalId | `false` | `uint8` |


#### Voted
| Name | Indexed | Type |
|:-:|:-:|:-:|
| voter | `false` | `address` |
| proposalId | `false` | `uint8` |


#### VoterRegistered
| Name | Indexed | Type |
|:-:|:-:|:-:|
| voterAddress | `false` | `address` |


#### WorkflowStatusChange
| Name | Indexed | Type |
|:-:|:-:|:-:|
| previousStatus | `false` | `uint8` |
| newStatus | `false` | `uint8` |



## `owner`

>👀 `view`



### 🔎 Details

Returns the address of the current owner.

### → Returns



| Name | Type |
|:-:|:-:|
|  Not specified  | `address` |



## `renounceOwnership`

>👀 `nonpayable`



### 🔎 Details

Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.



## `transferOwnership`

>👀 `nonpayable`



### 🔎 Details

Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.



## `winningProposalID`

>👀 `view`




### → Returns



| Name | Type |
|:-:|:-:|
|  Not specified  | `uint8` |



## `workflowStatus`

>👀 `view`




### → Returns



| Name | Type |
|:-:|:-:|
|  Not specified  | `uint8` |



## `getVoter`

>👀 `view`



### 🔎 Details

Gets the Voter struct of a given `_addr`

### ⚙️ Parameters

| Name | Type | Description |
|:-:|:-:| - |
| _addr | `address` | searched address |

### → Returns



| Name | Type |
|:-:|:-:|
|  Not specified  | `tuple` |



## `getOneProposal`

>👀 `view`



### 🔎 Details

Gets the Proposal struct for a given `_id`

### ⚙️ Parameters

| Name | Type | Description |
|:-:|:-:| - |
| _id | `uint8` | searched `proposalId` |

### → Returns



| Name | Type |
|:-:|:-:|
|  Not specified  | `tuple` |



## `addVoter`

>👀 `nonpayable`



### 🔎 Details

Adds a new voter `_addr` to the session

### ⚙️ Parameters

| Name | Type | Description |
|:-:|:-:| - |
| _addr | `address` | address to register Emits a {VoterRegistered} event. Requirements: - `address` cannot be already registered - `msg.sender` should be the owner - `worklowStatus` should be WorkflowStatus.RegisteringVoters |



## `addProposal`

>👀 `nonpayable`



### 🔎 Details

Adds a proposal named `desc` to the session

### ⚙️ Parameters

| Name | Type | Description |
|:-:|:-:| - |
| _desc | `string` | description of the new proposal Emits a {ProposalRegistered} event. Requirements: - `_desc` cannot be empty - `msg.sender` should be a voter - `worklowStatus` should be WorkflowStatus.ProposalsRegistrationStarted |



## `setVote`

>👀 `nonpayable`



### 🔎 Details

Vote for an existing `_id`

### ⚙️ Parameters

| Name | Type | Description |
|:-:|:-:| - |
| _id | `uint8` | `proposalId` to vote for Emits a {Voted} event. Requirements: - `_id` should exists - `msg.sender` should be a voter - `worklowStatus` should be WorkflowStatus.VotingSessionStarted - `msg.sender` should be owner |



## `startProposalsRegistering`

>👀 `nonpayable`



### 🔎 Details

Sets the `workflowStatus` to `ProposalsRegistrationStarted` Emits a {WorkflowStatusChange} event. Requirements: - `workflowStatus` should be WorkflowStatus.RegisteringVoters - `msg.sender` should be owner



## `endProposalsRegistering`

>👀 `nonpayable`



### 🔎 Details

Sets the `workflowStatus` to `ProposalsRegistrationEnded` Emits a {WorkflowStatusChange} event. Requirements: - `workflowStatus` should be WorkflowStatus.ProposalsRegistrationStarted - `msg.sender` should be owner



## `startVotingSession`

>👀 `nonpayable`



### 🔎 Details

Sets the `workflowStatus` to `VotingSessionStarted` Emits a {WorkflowStatusChange} event. Requirements: - `workflowStatus` should be WorkflowStatus.ProposalsRegistrationEnded - `msg.sender` should be owner



## `endVotingSession`

>👀 `nonpayable`



### 🔎 Details

Sets the `workflowStatus` to `VotingSessionEnded` Emits a {WorkflowStatusChange} event. Requirements: - `workflowStatus` should be WorkflowStatus.VotingSessionStarted - `msg.sender` should be owner



## `tallyVotes`

>👀 `nonpayable`



### 🔎 Details

Tally the winner setting the `winningProposalId` Emits a {WorkflowStatusChange} event. Requirements: - `workflowStatus` should be WorkflowStatus.VotingSessionEnded - `msg.sender` should be owner



