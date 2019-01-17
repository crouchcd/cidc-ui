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

## Whole Exome Sequencing (WES) File Type

Our WES upload process expects the upload of a metadata file. 

The directory where the metadata file is located should also contain all the Fastq files which needs to be uploaded.

Meta Data file is a csv file and requires following columns:

|COLUMN NAME|DESCRIPTION|
|-----------|-----------|
|**SAMPLE_ID**| Unique identifier for the sample|
|**TRIAL_ID**| Trial identifier (Example: DFCI_9999)|
|**PATIENT_ID**| Unique identifier for the patient|
|**TIMEPOINT**| Time associated with the sample acquisition|
|**TIMEPOINT_UNIT**| Unit associated with the timepoint data|
|**FASTQ_NORMAL_1**| Filename for fastq pair 1 from normal|
|**FASTQ_NORMAL_2**| Filename for fastq pair 2 from normal|
|**FASTQ_TUMOR_1**| Filename for fastq pair 1 from tumor| 
|**FASTQ_TUMOR_2**| Filename for fastq pair 2 from tumor|
|**BATCH_ID**| Sequencing batch identifier for the sample|
|**INSTRUMENT_MODEL**| Sequencing platform used for the assay|

## Uploading Files

Start the CLI and use your JWT to log in

Authorize using your JWT:

~~~~
(CMD) jwt your-jwt-here
~~~~

Run upload command:

~~~~
(CMD) upload_data
~~~~

Select a trial:

~~~~
====| Available Trials |=====
[1] - Some trial
[2] - Some other trial
[3] - DFCI-9999
~~~~

Select the number that corresponds to "DFCI-9999"

~~~~
Pick an upload method:
   [1] Upload using a metadata file.
~~~~

Enter 1 to select "Upload using a metadata file."

~~~~
Please enter the metadata file path: path/to/your/metadata
~~~~

The process should then automatically upload the files found in the metadata, assuming your file is formatted correctly.
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
