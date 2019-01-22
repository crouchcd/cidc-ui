import * as React from 'react';
import ReactMarkdown from "react-markdown";
import 'github-markdown-css/github-markdown.css';

const markdownContent: string = `
## Before uploading data
If you haven't already, see our instructions on downloading and installing the CIDC-CLI which you will use to upload data.

[CIDC-CLI Install Instructions](https://stagingportal.cimac-network.org/portal/cimac_biofx/cli-install)

You also need to install the Google Cloud SDK.

[Google Cloud SDK](https://cloud.google.com/sdk/install)

After installation you'll need to authenticate the SDK with the following command. Use the credentials you created for this portal.

~~~~
$ gcloud auth application-default login
~~~~

## File formats for Whole Exome Sequencing (WES) uploads:

To upload the WES data, create a directory with a metadata file and the fastq files. 

The metadata file is a csv file and requires the following columns:

|COLUMN NAME|DESCRIPTION|
|-----------|-----------|
|**SAMPLE_ID**| Unique identifier for the sample|
|**PATIENT_ID**| Unique identifier for the patient|
|**TRIAL_ID**| Trial identifier (Example: DFCI_9999)|
|**TIMEPOINT**| Time associated with the sample acquisition|
|**TIMEPOINT_UNIT**| Unit associated with the timepoint data|
|**FASTQ_NORMAL_1**| Filename for fastq pair 1 from normal|
|**FASTQ_NORMAL_2**| Filename for fastq pair 2 from normal|
|**FASTQ_TUMOR_1**| Filename for fastq pair 1 from tumor| 
|**FASTQ_TUMOR_2**| Filename for fastq pair 2 from tumor|
|**BATCH_ID**| Sequencing batch identifier for the sample|
|**INSTRUMENT_MODEL**| Sequencing platform used for the assay|
|**READ_LENGTH**| Length of sequencing reads|
|**INSERT_SIZE**|Insert size of the library used for paired end sequencing|

Click [here](https://docs.google.com/spreadsheets/d/1ThQj_5xNXX4-e5_2kB0LT0jQDCwtnrXKng859oOWLLw) to see an example of a metadata file.

## Uploading Files

**Start the CLI and use your JWT to log in**
~~~~
(CMD) jwt your-jwt-here
~~~~

**Run upload command:**
~~~~
(CMD) upload_data
~~~~

**Select a trial:**
~~~~
====| Available Trials |=====
[1] - Some trial
[2] - Some other trial
[3] - DFCI-9999
~~~~
Select the number that corresponds to your trial of interest, for example DFCI-9999.

**Select an assay:**
~~~~
====| Available Assays |=====
[1] - WES
~~~~

Select the number that corresponds to the assay data you want to upload.

**Select the upload method:**
~~~~
Pick an upload method:
   [1] Upload using a metadata file.
~~~~

**Enter path to your metadata file:**
~~~~
Please enter the metadata file path: path/to/your/metadata
~~~~

The process will then use the metadata file to upload the fastq files.
`;

export default class WholeExomeSequencingUploadMarkdown extends React.Component<{}, {}> {

    public render() {
        return (
            <div>
                <ReactMarkdown source={markdownContent} className="markdown-body markdown-width" />
            </div>
        );
    }
}
