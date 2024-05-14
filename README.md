# Street Group Tech Test

Author: Luke McCann

This is part of the Street Group Tech Test as per the specification below.

In preparing this project I decided to utilise one of my container build detailed below. I
decided to operate on Laravel 11 for the API as it is the latest version of Laravel, having
previously worked with Laravel 8 mostly. I included within this project:

- An Nginx Api Gateway
- A Laravel Api
- A React Client

I decided against using a database due to the simplicity of the project and instead opted to store the file
within Laravel storage. In a real application I would have opted for a NoSQL DB for this particular
implementation (something like MongoDB as a document store) as the data would have suited that format well
being parsed into a JSON object and not being very relational in it's nature.

I included PHPUnit tests on the backend, should I have used a database I would have usually included PGTap tests if utilising Postgres. When building the a Client I would usually use React Testing Library to test the components as well as accessibility, but thought this to be out of scope for this project given that the focus is on the API functionality.

I made some decisions on the Client side, for instance, in App.tsx I use inline styles, this again, is for simplicity, usually I would split components into separate files but since I am using MUI I did not see the need to in this case. If this were to grow and become more complex I would split the data rendering section in App.tsx into its own component and use a stylesheet to style the component as I have with the others.

Some issues I ran into here included:
- CORS
  - Due to running each service as it's own modular microservice CORS
    becomes an issue as you are sending requests from multiple IPs.

- PHP Rewrite
  - This is still and issue, it appears to be something with the config of Nginx and Laravel 11 but I didn't want to spend too much time debugging it, the issue occurs on the main port: `localhost:8080/api/`
  when trying to call any route other than the index Laravel has trouble routing to the file. This works fine on the Development route `localhost:8081'` and so I have used this to enable the application to work for now. If I were to continue this project I would be looking to resolve this such that I can hide the dev access ports from public and have all network requests operating on the internal docker network. This is a common practice I usually do as it is more secure and less prone to breaches and data leaks even when mistakes are made as everything is hidden behind an internal docker network.

## Resources

All resources used in this project are open source. The containers
were developed by me, specifically this project uses the `LERS-Stack`
which can be found on my github Organisation: https://github.com/Dockerbound-Immortal

Some deeper explanations can be found on my other organisation:
https://github.com/Summoned-Archfiend

## Prerequsites

- Docker

## How to Run

1. Clone the github repository: `git clone https://github.com/LukeMcCann/street-group.git`

2. run `make all` from the root


# Specification

## Homeowner Names - Technical Test

> Please do not spend too long on this test, 2 hours should be more than sufficient. You may
choose to create a full application with a basic front-end to upload the CSV, or a simple class
that loads the CSV from the filesystem.

You have been provided with a CSV from an estate agent containing an export of their
homeowner data. If there are multiple homeowners, the estate agent has been entering both
people into one field, often in different formats.

Our system stores person data as individual person records with the following schema:

### Person

- title - required
- first_name - optional
- initial - optional
- last_name - required

Write a program that can accept the CSV and output an array of people, splitting the name into
the correct fields, and splitting multiple people from one string where appropriate.

For example, the string “Mr & Mrs Smith” would be split into 2 people.

## Example Outputs

Input
`“Mr John Smith”`

Output

```
$person[‘title’] => ‘Mr’,
$person[‘first_name’] => “John”,
$person[‘initial’] => null,
$person[‘last_name’] => “Smith”
```

Input
`“Mr and Mrs Smith”`

Output

```
$person[‘title’] => ‘Mr’,
$person[‘first_name’] => null,
$person[‘initial’] => null,
$person[‘last_name’] => “Smith”
$person[‘title’] => ‘Mrs’,
$person[‘first_name’] => null,
$person[‘initial’] => null,
$person[‘last_name’] => “Smith”
```

Input
`“Mr J. Smith”`

Output

```
$person[‘title’] => ‘Mr’,
$person[‘first_name’] => null,
$person[‘initial’] => “J”,
$person[‘last_name’] => “Smith”
```

# Nginx Gateway Microservice Template

This template contains a complete stack utilising a `Laravel` API and `React` frontend with frontend `TypeScript` configured.

# Why Use This Template?

## Modularity

This template is completely modular. By default you will be able to spin up a Fullstack
application with an `Nginx` gateway, but that doesn't mean you have to stick with that.
You can spin up the client or API on their own perfectly reasonably using `docker-compose`
or their respective `Makefiles`. Using the `Makefiles` you don't even need to change the
structure of the project for a simple `client\api` service, just want a Client? you can
simply use the Client directory on it's own, want an API with a database but no client?
delete the client directory! want to add your own database? remove the DB step!
don't want the API gateway? simply remove the infrastructure! customise it to suite your
needs.

## Ease of Use

You can pull this template, run make, and have a dev environment ready to play with.

## Testing Ready

All the pain of setting up RTL with Vitest is done. In future versions we will
also have tests for the `API` ready to go. There are also some eslint rules
tailored to preferences used at a professional organisation.

## Fun

You can learn to set up more advanced `docker-compose` files by simply studying
the layout of this project. In the future we may decide to orchestrate these
containers with `Kubernetes` or `Docker Swarm`. We would also like to get some
automated CIs running.

# Usage

- To run this project for `development` with the `gateway` run: `make all`
- To run this project for `development` without the `gateway` run: `make dev`
- To run this project for `production` run: `make all` but remove the EXPOSED ports in the service containers

# Ports

The ports are exposed for development on `3000` and `8081`. These ports should not be exposed
on production, instead you should allow the gateway to forward traffic in the network. The reason
for this is that the direct access to the application is faster for development.

- Client: `8080` || `3000`
- API: `8080/api/` || `8081`

When heading into production traffic to the API can be restricted by uncommenting this line in the `default.conf`:

<pre>
# allow nginx-gateway
# deny all
</pre>

This will deny direct traffic to the API such that the API will only be accessible via the `nginx-gateway`, this tends
to be safer and more secure, thus, all of your API requests should be built to access via the `nginx-gateway` if you
intend on using it, the open port is meant for testing locally only.

# Technologies

- `Laravel`
- `Node`
- `React`
- `TypeScript`
- `Vite`
- `Nginx`
- `Jest`
- `React Testing Library`
- `Jest`
- `JestDom`
- `Vitest`
- `Nodemon`
