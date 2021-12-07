<img src="https://github.com/renato-favarin/health_insurance_cross_sell_prediction/blob/main/references/cover.png" alt="health insurance logo" title="Health Insurance" align="right" height="260" class="center"/>


# Health insurance cross sell prediction

**Disclaimer**: this project was inspired by the "Health Insurance Cross Sell Prediction" challenge published on kaggle (https://www.kaggle.com/anmolkumar/health-insurance-cross-sell-prediction). It is a fictitious project but with all the steps of a real project.

#### This project was made by Renato da Nova Favarin

# 1. Business scenario
This project is to help an insurance company that has provided health insurance to its customers  and now they need to build a model to predict whether the policyholders (customers) from past year will also be interested in vehicle insurance provided by the company. With the limited resources to contact the potential customers interested in vehicle insurance it is necessary to build a customers rank to enhance customer adhesion performance. 

# 2. Business assumptions

The Marketing Manager stated that they are only able to offer adequate treatment in the sales campaign - including calls, invitations for conversations in person and special attention to clarify doubts - up to 40% of last year's health insurance policyholders. Therefore, the company wants to obtain a list of the 40% of customers with health insurance most likely to acquire a car insurance to maximize customer conversion.


# 3. Solution strategy

When each customer signed up for health insurance during last year, they also completed a survey with relevant data to a car insurance decision-making, such as ownership of a driver's license, vehicle age, wheter the customer got his/ her vehicle damaged in the past, among other information.

The result of this survey will guide the creation of an ordered list of customers most likely to acquire a car insurancefor the company to select up to 40% of them to offer second insurance.


list of the 40% of customers most likely to purchase this second insurance.



My strategy to solve this challenge was:

**Step 01. Data description**

The first step was to collect the data which were at a postgreSQL database in the AWS Cloud and understand the data; 
There are 304887 customers records, containing different attributes such as: "gender", "age", "driving license", "vehicle age", "policy sales channel", among others; these data show the customer's interest in taking out car insurance, based on past experiences.

Important to mention that 20% of data were extracted (randomly, but stratified by response) for further testing of the model.

**Step 02. Feature engineering**

The responses of the "vehicle age" feature were changed to the snake_case pattern (for later one hot encoding) and the responses of the "vehicle damage" feature were changed: the originals "Yes" and "No" by 1 and 0, respectively.

**Step 03. Data filtering:**

Soon after, the check for missing values and outliers took place.

**Step 04. Exploratory data analysis**

With the help of SweetViz, the first exploratory data analysis was carried out to bring up some relevant insights that will be detailed later.
Additional, more specific analyzes were also carried out to understand the influence of some features on the customer's final decision to acquire a vehicle insurance.

**Step 05. Data preparation**

After analyzing the data, standard and minmax scalers were applied, in addition to target and frequency encoders for some features. All details are available on the notebook.

**Step 06. Feature selection**

The next step was to identify the most relevant features for training machine learning models. For this, in addition to the knowledge acquired during EDA, the Python implementations of the Boruta R package (https://github.com/scikit-learn-contrib/boruta_py) was used.
The features chosen by Boruta are described in the notebook.

**Step 07. Machine learning modelling**

Different machine learning algorithms were evaluated and tested with cross-validation, with different hyperparameters each: balanced random forest classifier, knn classifier,logistic regression, random forest classifier and xgboost classifier.

The "predict_proba" method (the probabilities for the target) was used to sort the customer's list and plot the cumulative gains and lift curves.

And precision and recall at k (in this case, 10%, 20%, 30% and 40% metrics were used to quantify the performance of the models and the choice of the better one
The precision at k is the proportion of recommended items in the top-k set that are relevant, where k is the number of rows of the sorted class 1 probability table 
The recall at k is the proportion of relevant items found in the top-k recommendations.

**Step 08. Hyperparameter fine tunning**

The best model was the xgboost classifier. For this business problem, no significant performance gains were verified after the fine tuning of hyperparameters.

**Step 09. Convert model performance to business values**

**Step 10. Deploy model to production**

# 4. Top 3 Data insights

**Hypothesis 01:**

**True/False.**

**Hypothesis 02:**

**True/False.**

**Hypothesis 03:**

**True/False.**

# 5. Machine Learning Model Applied

# 6. Machine Learning Model Performance

# 7. Business Results

# 8. Conclusions

# 9. Lessons Learned

# 10. Next Steps to Improve

# LICENSE

# All Rights Reserved - Comunidade DS 2021
