# /env/bash

#
# First time setup
SETUP_USERNAME=$1
SETUP_PROJNAME=$2

SETUP_USAGE='./setup.sh <username> <projectname>'

if [ -z "$SETUP_USERNAME" ]; then
  echo $SETUP_USAGE
  echo "> missing <username> argument"
  exit 1
fi

if [ -z "$SETUP_PROJNAME" ]; then
  echo $SETUP_USAGE
  echo "> missing <projectname> argument"
  exit 1
fi

if [ ! -f ~/.config/itch/butler_creds ]; then
  echo $SETUP_USAGE
  echo "> missing butler credentials @ ~/.config/itch/butler_creds - make sure you've signed into butler at least once"
fi

echo "
Running first time setup
> USERNAME=$SETUP_USERNAME
> PROJECTNAME=$SETUP_PROJNAME
"

#
# 1. Remove existing changelog
echo "... removing existing changelog"
rm -rf CHANGELOG.md

#
# 2. Update package.json
echo "... updating package.json"
npm pkg set version="0.1.0"
npm pkg set name="@$SETUP_USERNAME/$SETUP_PROJNAME"
npm pkg set description="$SETUP_PROJNAME"
rm -rf package-lock.json
npm i

#
# 3. Update README.md
echo "... updating README.md"
rm -rf README.md
echo "# @${SETUP_USERNAME}/${SETUP_PROJNAME}" >> README.md
echo "Started: "$(date) >> README.md

#
# 4. Setup github secrets
echo "... updating github secrets"
gh secret set BUTLER_CREDENTIALS < ~/.config/itch/butler_creds
gh secret set ITCH_CHANNEL --body "web"
gh secret set ITCH_GAME --body "$SETUP_PROJNAME"
gh secret set ITCH_USER --body "$SETUP_USERNAME"

#
# 5. github setup
echo "... (user input required) setup github pages"
echo "Navigate to the repository settings, then pages, then set the source to be github actions"
echo "Opening the repo..."
gh repo view --web
read -p "Press any key when you're done"

#
# 6. cleanup
git add .
git commit -am "chore(setup): ran automatic setup script"
echo "Setup finished"
echo "Push to remote repository & run the publish workflow to verify everything is OK"