import json

with open('src/data/courses.json', 'r', encoding='utf-8') as f:
    courses_data = json.load(f)

new_courses = [
  {
    "name": "B. A.",
    "link": "https://vidyawadicollege.org/admissions/courses/ug/ba",
    "degree": "Bachelor of Arts",
    "filter": "ug"
  },
  {
    "name": "B.A. B.Ed.",
    "link": "https://vidyawadicollege.org/admissions/courses/ug/babed",
    "degree": "Bachelor of Arts & Bachelor of Education",
    "filter": "ug"
  },{
    "name": "B.Com.",
    "link": "https://vidyawadicollege.org/admissions/courses/ug/bcom",
    "degree": "Bachelor of Commerce",
    "filter": "ug"
  }, {
    "name": "B.Sc.",
    "link": "https://vidyawadicollege.org/admissions/courses/ug/bsc",
    "degree": "Bachelor of Science",
    "filter": "ug"
  },
  {
    "name": "B.Sc. B.Ed.",
    "link": "https://vidyawadicollege.org/admissions/courses/ug/bscbed",
    "degree": "Bachelor of Science & Bachelor of Education",
    "filter": "ug"
  },
  {
    "name": "M.A.",
    "link": "https://vidyawadicollege.org/admissions/courses/pg/ma",
    "degree": "Master of Arts",
    "filter": "pg"
  },
  {
    "name": "M.Com.",
    "link": "https://vidyawadicollege.org/admissions/courses/pg/mcom",
    "degree": "Master of Commerce",
    "filter": "pg"
  },
  {
    "name": "M.Sc.",
    "link": "https://vidyawadicollege.org/admissions/courses/pg/msc",
    "degree": "Master of Science",
    "filter": "pg"
  }
]

courses_list = courses_data['courses']

for nc in new_courses:
    found = False
    for c in courses_list:
        if c['name'] == nc['name'] and c['category']['slug'] == nc['filter']:
            c['externalLink'] = nc['link']
            found = True
            break
    if not found:
        print(f"Could not find {nc['name']} with filter {nc['filter']}")

with open('src/data/courses.json', 'w', encoding='utf-8') as f:
    json.dump(courses_data, f, indent=4)
