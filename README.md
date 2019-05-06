# Spartacus deployment on Commerce Cloud
Spartacus can be deployed to Commerce Cloud, by providing a code repository that fulfiles certain conventions, such as a `manifest.json` file. 

Spartacus can be deployed as a JS storefront. This requires a repository with a `js-storefront` folder, containing the source or build of spartacus, as well as a manifest file that describes the js applications. This is documented on [help.sap.com](https://help.sap.com).

## Backend Setup
Spartacus heavily depends on the Commerce backend for the (cms) page structure, product data, etc. SAP Commerce can be configured with so-called sample data, which is done through extensions. There are a number of important setup:
- Sample data installation
- OAuth configuration
- CORS configuration
- Changes since SAP Commerce 1811
- Spartacus alongside spring mvc accelerators

### Sample data installation
The extension `spacceleratorsamplesaddon` is added for the installation of sample data for Spartacus. The sample data is almost equal to the default electronics sample storefront, but a number of changes have been made for spartacus. The new `basesite` and `basestore` are named `electronics-spa`.

The `spacceleratorsamplesaddon` extension is not released as part of any Commerce Release. It can be added to your repository and referenced in the manifest.json file of the `core-customize` folder. 

**Note:** some of the sample data is depending on data model changes in SAP Commerce 1905. Since this version is not yet released, there's no public `commerceSuiteVersion` available that can be used in a public repo. Internal repo's can use the latest snapshot release though. See below more info on the changes since 1811. 

### Oauth configuration
Whenever authentication is required between Spartacus and the backend, Spartacus uses the OAuth password flow, provided by the `authorizationserver`. This is why the  `authorizationserver` must be installed as a webapp on the API aspect on commerce cloud. 

The `authorizationserver` uses an Oauth configuration to identify (web) clients that uses the OAuth password flow. The client detail configuration is installed with the `commercewebservicesdata` (see `essentialdata_commercewebservicesdata.impex`). This extension `commercewebservicesdata` can be added to the core-customize folder.

The configuration must match the configuration in Spartacus, which can be configured in Spartacus with the following configurations:
```
authentication: {
    client_id: '',
    client_secret: ''
},
```

### CORS configuration
CORS will block any interaction between Spartacus and the backend if not configured correctly. The following properties have been added to configure the platform to allow any origin to interact. 

```
{
    "key": "corsfilter.ycommercewebservices.allowedOrigins",
    "value": "*"
},
```

**Note:** for production usage, the origins could be limited to specific clients. 

### Changes since SAP Commerce 1811
Since the latest relase of SAP Commerce (1811), a few data model small changes where introduced which are requried:
- A new type `CMSFlexComponent` was introduced to host any type without a specific model.  
- A new type `CMSSiteContextComponent` was introduced to replace the former `LanguageCurrencyComponent`. 

We've added these types temporarily to the `spacceleratorsamplesaddon` so we can still use the 1811 release.

### Spartacus alongside spring mvc accelerators
Spartacus is decoupled from the commerce platform, using a rest api. SAP Commerce Cloud can be setup to support multiple sites with multiple applications simulaneously, regardless of whether they're decoupled like Spartacus, or built with the Spring MVC based Accelerator templates. The multi-site features of the platform allow to mix sites, product and content catalogs, applications and configurations in a flexible way. 

In the Commerce Cloud this is achieved by configuring both the JS storefront aspect and the accstorefront. Both aspects can be configured and run simultanuously. 

## Spartacus setup
## Repository
SAP Commerce Cloud uses a single repository for both the backend and JS storefront applications. A dedicated `js-storefront` folder can be added to the repository. This is documented on [help.sap.com](https://help.sap.com).


### OCC baseUrl configuration
Whenever the `spacceleratorsamplesaddon` is setup in SAP Commerce, only the OCC baseUrl configuration is required. While the standard endpoints are configured by default in Spartacus, the baseUrl to the commerce environment must be provided per deployment. While this can be done in Spartacus configuration (using `backend.occ.baseUrl`), it is more covenient to add a special meta tag in the `index.html` of the application: 

`<meta name="occ-backend-base-url" content="OCC_BACKEND_BASE_URL_VALUE" />`

The deployed Spartacus storefront in Commerce Cloud will get the right API baseUrl, as the deployed storefront will have the value of `OCC_BACKEND_BASE_URL_VALUE` replaced with the API endpoint.

### Media
URLs to media provided by the backend are relative to the platform. As long as the API aspect is configured with the mediaweb web application, there no specific configuration requried in spartacus; Spartacus will fallback to the occ baseUrl if no specific `backend.occ.baseUrl` is provided. 

## Known issues
- We're currently lacking redirects on the JS storefronts. Redirects on a web server are required to route efery non-static file to the `index.html` of a Single Page Application. This means a 404 will be returned from the webserver in case of a page refresh or deeplink. 
