<img src="https://github.com/renato-favarin/health_insurance_cross_sell_prediction/blob/main/references/cover.png" alt="health insurance logo" title="Health Insurance" align="right" height="260" class="center"/>


# Health insurance cross sell prediction

**Disclaimer**: this project was inspired by the "Health Insurance Cross Sell Prediction" challenge published on kaggle (https://www.kaggle.com/anmolkumar/health-insurance-cross-sell-prediction). It is a fictitious project but with all the steps of a real project.

#### This project was made by Renato da Nova Favarin

# 1. Business scenario
This project is to help an insurance company that has provided health insurance to its customers  and now they need to build a model to predict whether the policyholders (customers) from past year will also be interested in vehicle insurance provided by the company. With the limited resources to contact the potential customers interested in vehicle insurance it is necessary to build a customers rank to enhance customer adhesion performance. 

# 2. Business assumptions

The Marketing Manager stated that they are only able to offer adequate treatment in the sales campaign - including calls and invitations for conversations in person and clarification of doubts - to approximately 40% of last year's policyholders. Therefore, the company wants to obtain a list of the 40% of customers with health insurance most likely to acquire a car insurance to maximize customer conversion.


# 3. Solution strategy

when each customer signed up for health insurance during last year, they also completed a survey with relevant data to a car insurance decision-making, such as ownership of a driver's license, vehicle age, wheter the customer got his/ her vehicle damaged in the past, among other information.

The result of this survey will guide the creation of a list of the 40% of customers most likely to purchase this second insurance.

My strategy to solve this challenge was:

**Step 01. Data description:**

The first step was to collect the data which were at a postgreSQL database in the AWS Cloud and understand the data; 
There are 304887 customers records, containing different attributes such as: "gender", "age", "driving license", "vehicle age", "policy sales channel", among others; these data show the customer's interest in taking out car insurance, based on past experiences.

Important to mention that 20% of data were extracted (randomly, but stratified by response) for further testing of the model.

**Step 02. Feature Engineering:**

The responses of the "vehicle age" feature were changed to the snake_case pattern (for later one hot encoding) and the responses of the "vehicle damage" feature were changed: the originals "Yes" and "No" by 1 and 0, respectively.

**Step 03. Data Filtering:**

Soon after, the check for missing values and outliers took place.

**Step 04. Exploratory Data Analysis:**

With the help of SweetViz, the first exploratory data analysis was carried out to bring up some relevant insights that will be detailed later.

**Step 05. Data Preparation:**

After analyzing the data, standard and minmax scalers were applied, in addition to target and frequency encoders for some features. All details are available on the notebook.

**Step 06. Feature Selection:**

The next step was to identify the most relevant features for training machine learning models. For this, in addition to the knowledge acquired during EDA, the Python implementations of the Boruta R package (https://github.com/scikit-learn-contrib/boruta_py) was used.
The features chosen by Boruta are described in the notebook.

**Step 07. Machine Learning Modelling:**



**Step 08. Hyperparameter Fine Tunning:**

**Step 09. Convert Model Performance to Business Values:**

**Step 10. Deploy Model to Production:**

# 4. Top 3 Data Insights

**Hypothesis 01:**

**True/False.**

**Hypothesis 02:**

**True/False.**

**Hypothesis 03:**

**True/False.**

# 5. Machine Learning Model Applied

# 6. Machine Learning Modelo Performance

# 7. Business Results

# 8. Conclusions

# 9. Lessons Learned

# 10. Next Steps to Improve

# LICENSE

# All Rights Reserved - Comunidade DS 2021
