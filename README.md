# Above App

## Hosting the App

### Deploy the AWS CloudFormation template

- Sign in to the AWS Management Console, and then open the AWS CloudFormation console.
- Choose Create Stack, and then choose With new resources (standard).
- Choose Upload a template file.
- Choose Choose file, choose the `above-stack.yaml` file from the cloned repository, and then choose Next.
- Enter a name for your stack, say `above-app`, and then choose Next.
- Keep all default options, and then choose Next.
- Review the final settings for your stack, and then choose Create stack.

### Customize your application source files

- After your stack is deployed, open the Output tab to get the Bucket name.
- You would see a sample of the API endpoint URL in the Output. To get the actual URL, clone and deploy the [Above API](https://github.com/daltino/above-api.git).
- Navigate to both <project_root>/src/config/local.ts|prod.ts , and then paste the URL to replace the BASE_API_URL variable value

### Build the application package

- In your project directory, run the `yarn build` command to build the application package.

### Deploy the application package

- Open the Amazon S3 console.
- Identify and choose the S3 bucket that you created earlier.
- Choose Upload, and then choose Add files.
- Choose the content of your build folder.
- Choose Add folder, and then choose the static directory. Important: Don’t choose the contents; choose the directory.
- Choose Upload to upload the files and directory to your S3 bucket.

## Test the application

### Access and test the application

- Open the Amazon CloudFront console, and then choose Distributions.
- Choose the relevant distribution ID, choose the Distribution domain name, and then copy the URL.
- Open a browser window, and then paste the URL to access the application.

## Clean up the resources

### Delete the S3 bucket contents

- Open the Amazon S3 console and choose the bucket that you created earlier
- Choose Empty to delete the bucket’s contents.

### Delete the AWS CloudFormation stack

- Open the AWS CloudFormation console and choose the stack that you created earlier.
- Choose Delete to delete the stack and all related resources.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
