<img src="https://github.com/renato-favarin/health_insurance_cross_sell_prediction/blob/main/references/cover.png" alt="health insurance logo" title="Health Insurance" align="right" height="260" class="center"/>


# Health insurance cross sell prediction

**Disclaimer**: this project was inspired by the "Health Insurance Cross Sell Prediction" challenge published on kaggle (https://www.kaggle.com/anmolkumar/health-insurance-cross-sell-prediction). It is a fictitious project but with all the steps of a real project.

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

Finally, **precision@k** and **recall@k** (in this case, k = 10%, 20%, 30% and 40%) metrics were used to quantify the performance of the models and to choose the better one.

- The **precision@k** is the proportion of recommended items in the top-k set that are relevant, where k is the number (or percentage, in this case) of rows of the class 1 (those that are intereseted in vehicle insurance) in the sorted probability table. 
- The **recall@k** is the proportion of relevant items found in the top-k recommendations.

**Step 08. Hyperparameter fine tunning**

The best model was the xgboost classifier. For this business problem, no significant performance gains were verified after the fine tuning of hyperparameters.

**Step 09. Convert model performance to business values**

The manager was given an ordered list of customers most likely to purchase vehicle insurance. When contacting the top 40% of the list, it is expected that there will be a conversion of at least 90% of the total interested in the product.

**Step 10. Deploy model to production**

To facilitate the use of the model and allow the ordering of new customer lists, the model was deployed on google sheets. When entering customer data and pressing the appropriate button, the tool displays the propensity score while sorting the list by this value. From this moment on, it is up to the company to contact as many customers as it wants to try to sell vehicle insurance, but always with the expectation that, by reaching the top 40% of the list, 90% of potential customers will be covered.

# 4. Top 3 Data insights

### 1) The older the car, the more interest its owner have in acquiring vehicle insurance

|Vehicle age|Interested in vehicle insurance|Not interested in vehicle insurance|
|----------------|:----------------:|:-------------:|
|Below 1 year|4.4%|95.6%|
|Between 1 and 2 years|17.4%|82.6%|
|Over 2 years|29.5%|70.5%|

<br>

### 2) If a customer already have vehicle insurance the chances of being interested in insurance are minimal

|Does the customer<br>have vehicle insurance?|Interested in vehicle insurance|Not interested in vehicle insurance|
|----------------|:----------------:|:-------------:|
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
Th

<img src="https://github.com/renato-favarin/health_insurance_cross_sell_prediction/blob/main/references/gain.png" alt="cumulative gains curve" title="cumulative gains curve" align="center" height="600" class="center"/>

The lift curve (comparative of how much better the model is in relation to the random choice) is presented next.

<img src="https://github.com/renato-favarin/health_insurance_cross_sell_prediction/blob/main/references/lift.png" alt="lift curve" title="lift curve" align="center" height="600" class="center"/>

The precision@k and recall@k for different proportions, up to 40%, of the different models are shown below.


|<img width=30/> Precision@|K-nearest neighbors|Logistic regression |Random forest classifier |Balanced random forest classifier |Xgboost classifier |Perfect model |
|----------|:----------:|:-------------------:|:------------------------:|:---------------------------------:|:------------------:|:-------------:|
| 10% | 0.32 | 0.35 | 0.36 |0.39 |0.39 | 1.00 |
| 20% | 0.30 | 0.33 | 0.33 |0.35 |0.35 | 0.61 |
| 30% | 0.28 | 0.30 | 0.31 |0.32 |0.32 | 0.41 |
| 40% | 0.26 | 0.27 | 0.28 |0.28 |0.28 | 0.31 |


|<img width=75/> Recall@|K-nearest neighbors|Logistic regression|Random forest classifier|Balanced random forest classifier|Xgboost classifier|Perfect model |
|----------------|:---------------:|:------------------:|:-----------------------:|:--------------------------------:|:-----------------:|:-------------:|
| 10% | 0.26 | 0.28 | 0.30 | 0.32 | 0.32 | 0.82 |
| 20% | 0.48 | 0.53 | 0.54 | 0.57 | 0.58 | 1.00 |
| 30% | 0.68 | 0.74 | 0.77 | 0.78 | 0.78 | 1.00 |
| 40% | 0.85 | 0.88 | 0.91 | 0.91 | 0.92 | 1.00 |

The best models are Xgboost classifier and Balanced random forest classifier. Also, the Xgboost classifier did slightly better in recall at 40%.
<br> 

Xgboost classifier is then considered for deployment into production.


# 6. Machine learning model performance

After preparing the training data (extracted from the raw data, as described in step 1 of the solution strategy) following the same data pipeline used for training the models, we can finally evaluate the final model, simulating the production environment, as the data is completely new.

The cumulative gains curve and lift curve of the test data are presented below.

<img src="https://github.com/renato-favarin/health_insurance_cross_sell_prediction/blob/main/references/gain_lift_final_model.png" alt="cumulative gains curve and lift curve" title="cumulative gains curve and lift curve" align="center" height="700" class="center"/>

As can be seen, after training the model with the training and validation datasets and testing it with the new data, the model continued to perform very well, with similar metric values obtained previously. The next two tables show the values of precision@k and recall@k up to 40%.


|Precision@|Xgboost classifier (train)|Xgboost classifier (test)
|----------------|:---------------:|:------------------:|
| 10% | 0.39 | 0.40 |
| 20% | 0.35 | 0.36 |
| 30% | 0.32 | 0.32 |
| 40% | 0.28 | 0.28 |

|Recall@ <img width=20/> |Xgboost classifier (train)|Xgboost classifier (test)
|----------------|:---------------:|:------------------:|
| 10% | 0.32 | 0.32 |
| 20% | 0.58 | 0.58 |
| 30% | 0.78 | 0.79 |
| 40% | 0.92 | 0.93 |


# 7. Business Results

We can note that by applying this model approximately 93% of potential customers interested in vehicular insurance will be converted by addressing 40% of the total customers currently with only health insurance.

The model was deployed on Heroku (https://www.heroku.com/) and available through a spreadsheet in Google Sheets (https://docs.google.com/spreadsheets/d/13CCxxC_E1_ihTFkELHAXVpEJL2tH35sLbGaDbn_WBvs/edit#gid=0)

Any employee of the insurance company can use the spreadsheet and establish a ranking of customers most likely to purchase vehicle insurance, with direct production data.

As can be seen in the demonstration below, there is a button that, once activated, after a few seconds, returns the list already sorted by the customers most likely to purchase the new product.

<img src="https://github.com/renato-favarin/health_insurance_cross_sell_prediction/blob/main/references/google_sheets_health_insurance.gif" alt="cumulative gains curve and lift curve" title="cumulative gains curve and lift curve" align="center" height="700" class="center"/>

Feel free to contact me and get a permission to edit and perform the sorting yourself.
Try changing some attribute values and see the impact on that customer's Score.


# 8. Conclusions

With the use of the model in production, it is expected, at least, to double the efficiency in the acquisition of new clients for vehicle insurance.

This is because you will only need to contact 40% of customers to get over 90% conversion. Without the model, when contacting purely random customers, it is reasonable to say that to have 90% of customers likely to close a deal, you would also have to contact 90% of the total list. 

# 9. Next steps to improve

For future learning to rank problems or new CRISP rounds for this business scenario, consider training these models:

- Balanced Bagging Classifier;
- Easy Ensemble Classifier;
- Random Under Sampler Classifier;
- Stochastic Gradient Descent Classifier

