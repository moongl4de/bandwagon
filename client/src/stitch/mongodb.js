// This document provides a collection of hard and soft limitations of the MongoDB system.

// BSON Documents
// BSON Document Size
// The maximum BSON document size is 16 megabytes.

// The maximum document size helps ensure that a single document cannot use excessive amount of RAM or, during transmission, excessive amount of bandwidth. To store documents larger than the maximum size, MongoDB provides the GridFS API. See mongofiles and the documentation for your driver for more information about GridFS.

// Nested Depth for BSON Documents
// MongoDB supports no more than 100 levels of nesting for BSON documents.