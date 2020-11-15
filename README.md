# Projects board

CRUD interface backed with a fake graphql API

## Project description

A projects board where user can manage their projects. Projects are linked to an enterprise that can be chosen. They can also have contributors from the user list.

## Technical info

It comes with a fake graphql API serving a `db.json` file. The database file has 3 fields (`projects, users, enterprises`) with relations between them that are based on sub-fields.

## Installation

- Clone this repository locally (`git clone https://github.com/hakanErgin/projects-board.git`)
- In the terminal window locate to the cloned directory with `cd projects-board` and use `npm install` to install dependencies

Install fake graphql server:

- Install [this package](https://github.com/marmelab/json-graphql-server) using `npm install -g json-graphql-server`
- While in `projects-board` directory, launch the server using `json-graphql-server db.json --p 5000` to server `db.json` on `http://localhost:5000/`
- In the same directory, using another terminal window; start React client UI using `npm start`

_### Other_

Things to improve:

- Code can be structurally improved and DRY'ed. I.e: `addproject` and `editproject` components can be merged
- More cache updating functions can be added so that we don't have to refetch data
- Tests
