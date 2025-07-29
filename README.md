# Usage

```
Run
npm run decrypt <PATH_TO_FLOWS_CRED> <SECRET> > <FILE.json>
to decrypt the flows_cred.json. This will log the decrypted file in your console. Save the Output in a txt file

Then add your credentials to the <OUTPUT_FILE.json>

To make sure your <FILE.json> has the right format run
npm run fix-json  <FILE.json>  <OUTPUT_FILE.json>

Finally encrypt your credentials again by running
npm run encrypt <PATH_TO_FLOWS_CRED> <SECRET> <FILE.json>
```