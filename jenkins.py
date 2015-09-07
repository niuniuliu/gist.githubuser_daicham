# usage:
#  python jenkins.py jobname1, jobname2
import sys, httplib

JENKINS_HOST = 'localhost:8080'
URL = '/jenkins/job/%s/build?token=%s&cause=%s'
JENKINS_AUTH_TOKEN = 'token'
CAUSE='Requested%20by%20Python'

jenkins_job_ids = sys.argv
jenkins_job_ids.pop(0)     # shift operation to reduce this command

for job_id in jenkins_job_ids:
  http = httplib.HTTPConnection(JENKINS_HOST)
  url = URL % (job_id, JENKINS_AUTH_TOKEN, CAUSE)
  http.request('GET', url)
  response = http.getresponse()
  #print response.status, response.reason, url # debug
