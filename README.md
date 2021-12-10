<img src="https://github.com/renato-favarin/health_insurance_cross_sell_prediction/blob/main/references/cover.png" alt="health insurance logo" title="Health Insurance" align="right" height="260" class="center"/>


# Health insurance cross sell prediction

**Disclaimer**: this project was inspired by the "Health Insurance Cross Sell Prediction" challenge published on kaggle (https://www.kaggle.com/anmolkumar/health-insurance-cross-sell-prediction). It is a fictitious project but with all the steps of a real project.

#### This project was made by Renato da Nova Favarin

# 1. Business scenario

This project is to meet an insurance company demand that has provided health insurance to its customers and now they need to build a model to predict whether the policyholders (customers) from past year will also be interested in vehicle insurance. With the limited resources to contact the potential customers interested in vehicle insurance it is necessary to build a customers rank to enhance customer adhesion performance. This is a learning to rank project (LTR).


# 2. Business assumptions

The Marketing Manager stated that they are only able to offer adequate treatment during sales campaign - including calls, invitations for conversations in person and special attention to clarify doubts - up to 40% of last year's health insurance policyholders. 
Therefore, the company wants to obtain an ordered list of customers most likely to purchase vehicle insurance to maximize customer conversion.

# 3. Solution strategy

When each customer signed up for health insurance during last year, they also completed a survey with relevant data to a car insurance decision-making, such as ownership of a driver's license, vehicle age, wheter the customer got his/ her vehicle damaged in the past, among other information.

The result of this survey will guide the creation of a machine learning model that will produce an ordered list of customers most likely to acquire a car insurance.

The strategy to solve this challenge was:

**Step 01. Data description**

The first step was to collect the data which were at a postgreSQL database in the AWS Cloud and understand the data. 
There are 304887 customers records, containing different attributes such as: "gender", "age", "driving license", "vehicle age", "policy sales channel", among others; these data show the customer's final interest in taking out car insurance, based on past experiences.

Important to mention that 20% of data were extracted (randomly, but stratified by response) for further testing of the final model.

**Step 02. Feature engineering**

The responses of the "vehicle age" feature were changed to the snake_case pattern (for later one hot encoding) and the responses of the "vehicle damage" feature were also changed: the originals "Yes" and "No" by 1 and 0, respectively.

**Step 03. Data filtering:**

Soon after, the check for missing values and outliers took place.

**Step 04. Exploratory data analysis**

With the help of SweetViz, the first exploratory data analysis was carried out to bring up some relevant insights.
Furthermore, specific analyzes were also carried out to understand the influence of some features on the customer's final decision to acquire a vehicle insurance.

**Step 05. Data preparation**

After analyzing the data, standard and minmax scalers were applied, in addition to target and frequency encoders for some features. All details are available on the notebook.

**Step 06. Feature selection**

The next step was to identify the most relevant features for training machine learning models. For this, in addition to the knowledge acquired during EDA, the Python implementations of the Boruta R package (https://github.com/scikit-learn-contrib/boruta_py) was used.
The features chosen by Boruta are described in the notebook.

**Step 07. Machine learning modelling**

Different machine learning algorithms were evaluated and tested with cross-validation, with different hyperparameters each: balanced random forest classifier, knn classifier,logistic regression, random forest classifier and xgboost classifier; each of the studied algorithms is present in a separate notebook.

The "predict_proba" method (the probabilities for the target) was used to sort the customer's list and plot the cumulative gains and lift curves.

Finally, precision@k and recall@k (in this case, k = 10%, 20%, 30% and 40%) metrics were used to quantify the performance of the models and to choose the better one.

- The precision@k is the proportion of recommended items in the top-k set that are relevant, where k is the number (or percentage, in this case) of rows of the class 1 (those that are intereseted in vehicle insurance) in the sorted probability table. 
- The recall@k is the proportion of relevant items found in the top-k recommendations.

**Step 08. Hyperparameter fine tunning**

The best model was the xgboost classifier. For this business problem, no significant performance gains were verified after the fine tuning of hyperparameters.

**Step 09. Convert model performance to business values**

The manager was given an ordered list of customers most likely to purchase vehicle insurance. When contacting the top 40% of the list, it is expected that there will be a conversion of at least 90% of the total interested in the product.

**Step 10. Deploy model to production**

To facilitate the use of the model and allow the ordering of new customer lists, the model was deployed on google sheets. When entering customer data and pressing the appropriate button, the tool displays the propensity score while sorting the list by this value. From this moment on, it is up to the company to contact as many customers as it wants to try to sell vehicle insurance, but always with the expectation that, by reaching the top 40% of the list, 90% of potential customers will be covered.

# 4. Top 3 Data insights

### 1) The older the car, the more interest its owner have in acquiring vehicle insurance

|Vehicle age|Interested in vehicle insurance|Not interested in vehicle insurance|
|----------------|----------------|-------------|
|Below 1 year|4.4%|95.6%|
|Between 1 and 2 years|17.4%|82.6%|
|Over 2 years|29.5%|70.5%|

<br>

### 2) If a customer already have vehicle insurance the chances of being interested in insurance are minimal

|Does the customer<br>have vehicle insurance?|Interested in vehicle insurance|Not interested in vehicle insurance|
|----------------|----------------|-------------|
|No|22.5%|77.5%|
|Yes|0.1%|99.9%|

<br>

### 3) Age is relevant in the decision to take out vehicle insurance**

<img src="https://github.com/renato-favarin/health_insurance_cross_sell_prediction/blob/main/references/age_response.png" alt="age vs response" title="age vs response" align="center" height="400" class="center"/>


# 5. Machine learning models applied

All machine learning algorithms were trained using cross validation on training data. A quick adjustment of the hyper-parameters was also made to check any performance differences with different settings.
The only model that underwent significant changes depending on the configuration of the hyper-parameters was the KNN. The results of all model configurations can be checked on individual notebooks, each dedicated to a machine learning algorithm.

The gain curve is presented below considering the best configuration found for each model. As a comparison, we have what would be the perfect model, that is, the one that orders the list perfectly, considering all interested parties before listing the first non-interested customer.
A comparison is also made with the random model, that is, one that orders the list of customers in a completely random manner (the current baseline of the company).


<img src="https://github.com/renato-favarin/health_insurance_cross_sell_prediction/blob/main/references/gain.png" alt="age vs response" title="age vs response" align="center" height="600" class="center"/>

Models' results
Gain curve
Lift curve
Precision @ k table
Recall @ k table


# 6. Machine Learning Model Performance

XGBoost final config
Gain and lift curves
Test results


# 7. Business Results

Deploy at google sheets

# 8. Conclusions

# 9. Lessons Learned

# 10. Next Steps to Improve

# LICENSE

# All Rights Reserved - Comunidade DS 2021
