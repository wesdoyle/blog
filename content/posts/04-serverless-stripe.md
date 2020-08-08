---
title: "Serverless Stripe Webhooks Integration"
description: "Setting up Stripe Webhooks with AWS Lambda + API Gateway"
date: 2020-08-20
---

## Using Stripe and its Webhooks with AWS

A few weeks ago, I set up a Stripe integration for a
<a href="https://entryleveleng.com" target="_blank">job board for entry-level 
engineers</a> I launched.

The project is cloud-native, comprising a combination of API Gateway,
Lambda, and DynamoDB on the back end.

From a development perspective, Stripe is a very nice platform. 
It easy to get things set up on the Stripe side.  
However, there were a few things to figure out on the AWS
side to set up a solid integration.

One of the things that makes a Stripe integration so flexible is the ability
to use Stripe webhooks. Using webhooks, you can listen for events happening 
on Stripe's platform and react accordingly on your own.  For instance, I 
need to do things like send emails, ensure the right job postings are visible, 
and other typical business processes when a user completes a successful payment.

One of the <a href="https://stripe.com/docs/webhooks/best-practices" 
target="_blank"> best practices</a> when integrating webhooks is to verify the 
events received are indeed from Stripe. This is achieved by allowing Stripe 
to sign the webhook events it sends in an HTTP header.  With a shared secret, 
it is trivial to verify the event. Additionally, the risk of replay attacks 
can be mitigated by verifying the header, as Stripe includes a timestamp in 
the signed payload.  Therefore, we can check the timestamp and reject it if 
it's not within some specified time delta.

This is all great, but I ran into two gotchas while working on the integration.

### 1.) Getting the raw request stream in API Gateway

When verifying the signed payload, we need to be able read the raw request
stream sent from Stripe. This needs to be precisely unchanged, because it's
hashed and compared against what Stripe sent to verify.

### 2.) Getting the HTTP header of via Lambda-triggered API Gateway endpoint

By default, API Gateway does not provide the HTTP headers to a Lambda
integration.

## The Solution: API Gateway REST API

The trick was to set up an API endpoint using an API Gateway ‘REST API’
resource (as opposed to an ‘HTTP API’ resource. In API Gateway, HTTP APIs are
basic low-latency Lambda / HTTP proxies. They're newer, cheaper, and simpler
than API Gateway REST APIs. However, at the time of this posting, the 
REST APIs provide more control over the HTTP request and response.

From the API Gateway console, The ‘REST API’ lets you configure an “Integration
Request.” Here, we can control all kinds of stuff about the endpoint. We have
to create a new “Mapping Template” to integrate with Lambda.

The following configuration lets us pass the headers and preserve the raw body
of the request:

```js
{
  "rawBody": "$util.escapeJavaScript($input.body).replace("\'", "'")",
  "body" : $input.json('$'),
  "headers": {
    #foreach($param in $input.params().header.keySet())
    "$param": "$util.escapeJavaScript($input.params().header.get($param))"
    #if($foreach.hasNext),#end
    #end
  }
}
```

This template is written using _AWS Velocity Template_language. It looks a
bit like JSON with some special directives built in.  In any case, with this
config, the integrated Lambda now has the header and a raw version of the
request payload (in addition to the standard serialized body).

In Lambda, we can now use `event.get('headers')` required for getting the
signature, `event.get('rawBody')` for the payload, and verify the signed
headers as needed in the Lambda function.
