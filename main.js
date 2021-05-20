/**
 * This Action uses Curl to delete DNS record with CloudFlare API
 * read documentation for CF API: https://api.cloudflare.com/#dns-records-for-a-zone-list-dns-records
 */

const cp = require("child_process");

const getCurrentRecordId = () => {
  const { status, stdout } = cp.spawnSync("curl", [
    ...["--header", `Authorization: Bearer ${process.env.INPUT_TOKEN}`],
    ...["--header", "Content-Type: application/json"],
    `https://api.cloudflare.com/client/v4/zones/${process.env.INPUT_ZONE}/dns_records?name=${encodeURIComponent(process.env.INPUT_NAME)}`,
  ]);

  if (status !== 0) {
    process.exit(status);
  }

  const { success, result, errors } = JSON.parse(stdout.toString());

  if (!success) {
    console.log(`::error ::${errors[0].message}`);
    process.exit(1);
  }

  return result[0] ? result[0].id : null;
};

const deleteRecord = (id) => {
  const { status, stdout } = cp.spawnSync("curl", [
    ...["--silent", "--request", "DELETE"],
    ...["--header", `Authorization: Bearer ${process.env.INPUT_TOKEN}`],
    ...["--header", "Content-Type: application/json"],
    `https://api.cloudflare.com/client/v4/zones/${process.env.INPUT_ZONE}/dns_records/${id}`,
  ]);

  if (status !== 0) {
    process.exit(status);
  }

  const { success, result, errors } = JSON.parse(stdout.toString());

  if (!success) {
    console.log(`::error ::${errors[0].message}`);
    process.exit(1);
  }
};

const id = process.env.INPUT_ID || getCurrentRecordId();
if (!id) {
  console.log("Record doesn't exist. Nothing to delete.");
  process.exit(0);
}

deleteRecord(id);
