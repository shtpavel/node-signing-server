node-signing-server
===================

Server that allows you to sign your data and to validate it on some public place. It should be used with https as a part of some infrastructure. It is ok to separate GET key resource and provide it as a public for some clients. 
##Requirements
* **OpenSSL**. Because of [pem module](https://github.com/andris9/pem), it is neсessary to have OpenSSL installed on your system. 

##Configuration
* ```
config\appConfig.js
```
  * _storeDir_ - the place to store your keys on your filesystem
  * _keyEncoding_ - keys encoding ('binary', 'hex', 'base64')

##API
* Gets public key

 ```
 GET /:client/key
 ```
  * client - client name
  * response:
    * ```
      {publicKey: "some public key", error: "error if exist"}
      ```

* Recreate key pair and return public key

 ```
 PUT /:client/key
 ```
  * client - client name
  * response:
    * ```
      {publicKey: "some public key", error: "error if exist"}
      ```

* Sign data

 ```
 POST /:client/sign
 ```
  * client - client name
  * Request body should contains **data** parameter with data you want to sign
  * response:
    * ```
      {signature: "Signature", publicKey: "some public key to verigy data", error: "error if exist"}
      ```




  