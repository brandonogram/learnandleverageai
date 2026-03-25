#!/bin/bash
# Meta Business Setup Script for Learn & Leverage AI
# Run this AFTER Brandon creates the Facebook page manually
# Usage: ./setup-meta-after-page-creation.sh <PAGE_ID>

set -e

PAGE_ID="$1"
TOKEN="EAAmoLbxrRxYBQ5ZBq8ZCn6UukPjAVabUZBsZAKZA3DBfJkYG6OS4KlLV5ezodZANe2fimDuZAaj8kvOh0CcHBRe1SfjGvs1yVTkTfdhKLf0usHjv2rUxohev4tA9pa1mEJ3TSeDhFSbgsjhIGHsRg0BdMJ9krvwZCJwO73XifbilckGpqGaoCTcv1k6nlhNNTdHaJgZAJsfXoLQZDZD"
BIZ_ID="1648215349007735"

if [ -z "$PAGE_ID" ]; then
  echo "Usage: $0 <FACEBOOK_PAGE_ID>"
  echo "Get the Page ID from the page URL or Page Settings > About"
  exit 1
fi

echo "=== Setting up Meta Business for Learn & Leverage AI ==="
echo "Page ID: $PAGE_ID"
echo "Business ID: $BIZ_ID"
echo ""

# Step 1: Verify the page exists
echo "--- Verifying page..."
PAGE_INFO=$(curl -s "https://graph.facebook.com/v22.0/$PAGE_ID?fields=id,name,category&access_token=$TOKEN")
echo "$PAGE_INFO" | python3 -m json.tool
echo ""

# Step 2: Get page access token
echo "--- Getting page access token..."
PAGE_TOKEN=$(curl -s "https://graph.facebook.com/v22.0/me/accounts?access_token=$TOKEN" | python3 -c "
import json, sys
data = json.load(sys.stdin)
for page in data.get('data', []):
    if page['id'] == '$PAGE_ID':
        print(page.get('access_token', 'NOT_FOUND'))
        break
else:
    print('PAGE_NOT_IN_ACCOUNTS')
")
echo "Page token: ${PAGE_TOKEN:0:30}..."
echo ""

# Step 3: Add page to Business Manager
echo "--- Adding page to Business Manager..."
ADD_RESULT=$(curl -s -X POST "https://graph.facebook.com/v22.0/$BIZ_ID/owned_pages" \
  -d "page_id=$PAGE_ID" \
  -d "access_token=$TOKEN")
echo "$ADD_RESULT"
echo ""

# Step 4: Create ad account for LLAI
echo "--- Creating ad account for LearnAndLeverageAI..."
AD_ACCOUNT=$(curl -s -X POST "https://graph.facebook.com/v22.0/$BIZ_ID/adaccount" \
  -d "name=LearnAndLeverageAI" \
  -d "currency=USD" \
  -d "timezone_id=1" \
  -d "end_advertiser=$BIZ_ID" \
  -d "media_agency=NONE" \
  -d "partner=NONE" \
  -d "access_token=$TOKEN")
echo "$AD_ACCOUNT"
AD_ACCOUNT_ID=$(echo "$AD_ACCOUNT" | python3 -c "import json,sys; print(json.load(sys.stdin).get('id','FAILED'))" 2>/dev/null || echo "FAILED")
echo "Ad Account ID: $AD_ACCOUNT_ID"
echo ""

# Step 5: Check for Instagram connection
echo "--- Checking Instagram connection..."
IG_INFO=$(curl -s "https://graph.facebook.com/v22.0/$PAGE_ID?fields=instagram_business_account{id,username,name}&access_token=$TOKEN")
echo "$IG_INFO"
echo ""

# Summary
echo ""
echo "========================================="
echo "  SETUP SUMMARY"
echo "========================================="
echo "Facebook Page ID: $PAGE_ID"
echo "Ad Account ID: $AD_ACCOUNT_ID"
echo "Business Manager: $BIZ_ID"
echo "Page Token: ${PAGE_TOKEN:0:30}..."
echo ""
echo "Next steps:"
echo "1. Create Instagram @learnandleverageai and switch to Business"
echo "2. Link Instagram to this Facebook page"
echo "3. Install Meta Pixel on learnandleverageai.com"
echo "4. Update ~/shared-brain/CREDENTIALS.md"
echo "5. Update docs/meta-business-setup.md with IDs"
