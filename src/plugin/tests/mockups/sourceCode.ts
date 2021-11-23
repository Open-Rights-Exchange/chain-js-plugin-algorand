export const sourceApproval = `#pragma version 2

// read global state
byte "counter"
dup
app_global_get

// increment the value
int 1
+

// store to scratch space
dup
store 0

// update global state
app_global_put

// load return value as approval
load 0
return`

export const sourceClear = `#pragma version 2
// This program clears program state

int 1`
