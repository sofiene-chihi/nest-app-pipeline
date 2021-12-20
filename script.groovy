def testApp() {
    echo "testing the application..."
} 

def buildImage() {
    echo "building the docker image..."
    withCredentials([usernamePassword(credentialsId: 'docker-hub-repo', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
        sh 'docker build -t sofienechihi/my-repo:nest-app-1.0 .'
        sh "echo $PASS | docker login -u $USER --password-stdin"
        sh 'docker push sofienechihi/my-repo:nest-app-1.0'
    }
} 

def deployApp() {
    echo 'deploying the application...'
} 

return this