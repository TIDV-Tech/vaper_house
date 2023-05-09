##How the Vaper-house database works

In this README.md i´ll explain how the database microservice works, with its respective controllers:

####Models:

- **User:** Take the next data:
	- **fullName** = String - required.
	- **dateBirht** = Date - required.
	- **email** = String - required - **unique.**
	- **password** = String - required.

**Example:**

![](https://i.ibb.co/7JXhkfs/Anotaci-n-2023-05-08-143921.png)

---

- **Product:** Take the next data:
	- **name** = String - required.
	- **description** = Date - required.
	- **type** = String - required.
	*Note: **type** only accept these values: Vaper, Acondicionador, Bateria, Resistencia, E-Liquid, Accesorio.*
	- **brand** = String - required.
	- **img** = String - required.
	- **reviews** = Array of ObjectId´s.
	*Note: The **reviews** is a reference from the Review model, works like the Review model foreign key.*
	- **avaible** = Boolean - true by default.
	- **promotion** = Boolean - false by default.
	- **price** = Number - rquired.
	- **quantity** = Number - rquired.
	**promotionPrice** = Number - 0 by default.

**Example:**

![](https://i.ibb.co/5WxYfY8/product.png)

---

- **Purchase:**
	- **user** = ObjectId - required.
	- **products** = Array of ObjectId´s - required.
	*Note: **user** and **products** are the reference to the User and Product models id, but the **products** receive an array of ObjectId´s.*
	- **paymentMethod** = String - required.
	*Note: **paymentMethod** only accept these values: Vaper, Acondicionador, Bateria, Resistencia, E-Liquid, Accesorio.*
	- **totalPrice** = Number - required.

**Example**:
![](https://i.ibb.co/8by3zPQ/review.png)

---

- **Review:**
	- **userId** = ObjectId - required.
	-*Note: **userId** is the reference to User model id.*
	- **description** = String - required.
	- **rating** = Number - required.

**Example**:
![](https://i.ibb.co/Hq1MXGC/review.png)

---

- **Cart:**
	- **productId** = Array of ObjectId.
	- **quantityProducts** = Array of Numbers.
	*Note: The **productId** array´s the reference to the Product model id,  and **quantityProducts** reflect the number of products to add to the cart, which have the same position that the productId array.*

**Example**:
![](https://i.ibb.co/QrsnrRg/cart.png)

---

####Controllers:

**Users:**

- **saveUser: ** Receives the user data to register a new user.

**The excepted data:**

![](https://i.ibb.co/Y80fKn5/expected-user.png)

- **findUsers:** Return all the users from the database.

- **findByFilter:** Receives the filter to find some users with an filter.

**The excepted data:**

![](https://i.ibb.co/tDdJ6L6/expected-filter.png)

*Note: The **fullName** references the property i want to search and find the match with some value.*

- **updateUser:** Receives the user id to find the user and update the respective data.

**The expected data:**

![](https://i.ibb.co/GC1fwm2/expected-update.png)

*Note: The **newData** object references the data i want to update to the user.*

- **deleteUser:** Receives the user id to find the user and delete it.

**The expected data:**

![](https://i.ibb.co/R7xK55p/expected-user-id.png)

---

**Products:**

- **saveProduct:** Receive the product data to register a new product.

**The expected data:**

![](https://i.ibb.co/0hnGtmp/expected-product.png)

- **changeProductPromotion:** Receive the product id and the new price if the product isn´t on promotion.

**The expected data:**

![](https://i.ibb.co/KDhZ3qM/expected-promotion.png)

- **findProducts:** Return all the products on the database.

- **findByFilter:** Receives the filter to find some products with an filter.

**The excepted data:**

![](https://i.ibb.co/R7Sc6Fc/expected-filter.png)

*Note: The **name** references the property i want to search and find the match with some value.*

- **findByMostRecent:** Return the most recent products, registered 15 days ago.

- **findByRelated:** Receives the product id to know which products are related with it.

**The expected data:**

![](https://i.ibb.co/ZYLQV6x/expected-product-id.png)

- **updateProduct:** Receives the product id to find the product and update the respective data.

**The expected data:**

![](https://i.ibb.co/bQ2hYd8/expected-update.png)

*Note: The **newData** object references the data i want to update to the user.*

- **deleteProduct:** Receives the product id to find the product and delete it.

**The expected data:**

![](https://i.ibb.co/ZYLQV6x/expected-product-id.png)

---

**Purchases:**

- **registerPurchase:** Receives the user id to identify the cart related with an user and the payment method.

**The expected data:**

![](https://i.ibb.co/pJDRncj/expected-purchase.png)

*Note: When a **purchase** will be registered, it need at least one product on the **cart**, that´s why the cart required products added previously.*

- **showPurchase:** Return all the purchases on the database.

---

**Reviews:**

- **getReviews:** Return all the reviews on the database.

- **registerReview:** Receives review data to register a new review.

**The expected data:**

![](https://i.ibb.co/PDL1gxQ/expected-review.png)

----

**Carts:**

- **getCartContent:** Return all the products that have the cart.

**The expected data:**

![](https://i.ibb.co/R7xK55p/expected-user-id.png)

*Note: When an user´s registered, at the same time, a cart´s automatically created with the same user id.*

- **addToCart:** Receives the user id to refer to cart, the product id to refer the product and the desired quantity of products.

**The expected data:**

![](https://i.ibb.co/Sw1chFS/expected-cart.png)

- **removeToCart:** Receives the user id to refer to cart and the product id that desired to remove to the cart.

**the expected data:**

![](https://i.ibb.co/Jdry4C3/expected-remove.png)

- **emptyCart:** Remove everything to the cart.