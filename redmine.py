# usase:
#   python redmine.py projectname1, projectname2
import sys, httplib

REDMINE_HOST = 'localhost:3000'
URL = '/redmine/sys/fetch_changesets?id=%s&key=%s'
REDMINE_API_KEY = 'token'

redmine_project_ids = sys.argv
redmine_project_ids.pop(0)     # shift operation to reduce this command

for project_id in redmine_project_ids:
  http = httplib.HTTPConnection(REDMINE_HOST)
  url = URL % (project_id, REDMINE_API_KEY)
  http.request('GET', url)
  response = http.getresponse()
  #print response.status, response.reason, url # debug
