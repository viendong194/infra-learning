#!/bin/bash -e
AMIID="$(aws ec2 describe-images --filters \
"Name=name,Values=amzn2-ami-hvm-2.0.202*-x86_64-gp2" \
--query "Images[0].ImageId" --output text)"
VPCID="$(aws ec2 describe-vpcs --filter "Name=isDefault, \
Values=true" \
--query "Vpcs[0].VpcId" --output text)"
SUBNETID="$(aws ec2 describe-subnets --filters \
"Name=vpc-id,Values=$VPCID" --query "Subnets[0].SubnetId" \
--output text)"
INSTANCEID="$(aws ec2 run-instances --image-id "$AMIID" \
--instance-type t2.micro --subnet-id "$SUBNETID" \
--iam-instance-profile Name=ec2-ssm-core \
--query "Instances[0].InstanceId" --output text)"
while true; do
    STATUS=$(aws ec2 describe-instance-status --instance-ids $INSTANCEID --query "InstanceStatuses[0].InstanceStatus.Status" --output text)
    if [ "$STATUS" == "ok" ]; then
        echo "Instance $INSTANCEID is fully initialized and running."
        break
    else
        echo "Waiting for instance $INSTANCEID to be fully initialized..."
        sleep 15
    fi
done

echo "connect to the instance using Session Manager"
echo "https://console.aws.amazon.com/systems-manager/session-manager/$INSTANCEID"
read -r -p "Press [Enter] key to terminate $INSTANCEID..."
aws ec2 terminate-instance --instance-ids "$INSTANCEID" > /dev/null
echo "terminating $INSTANCEID ..."
aws ec2 wait instance-terminated --instance-ids "$INSTANCEID"
echo "done."
