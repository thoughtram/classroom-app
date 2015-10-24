#!/bin/bash
echo -e "\033[0;32mDeploying new classroom app...\033[0m"

echo -e "\033[0;32mBuilding dist for production...\033[0m"

gulp build:prod --production

echo -e "\033[0;32mDeploying...\033[0m"

# delete old gh-pages branch
git branch -D deploy

git checkout -b deploy

# Add changes to git.
git add -f dist

# Commit changes.
msg="chore(*): adding dist `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

git subtree split -P dist -b deploy-dist

# Push source and build repos.
git push -f origin deploy-dist:gh-pages
git branch -D deploy-dist
git checkout master
git branch -D deploy
