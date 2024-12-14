#!/bin/bash

# Function to display usage
usage() {
    echo "Usage: $0 [-c] [-r] [-d] -p <process_name> -o <output_file>"
    echo "  -c  Collect CPU usage"
    echo "  -r  Collect RAM usage"
    echo "  -d  Collect Disk usage"
    echo "  -p  Process name"
    echo "  -o  Output file"
    exit 1
}

# Parse command line arguments
while getopts "crdp:o:" opt; do
    case $opt in
        c) collect_cpu=true ;;
        r) collect_ram=true ;;
        d) collect_disk=true ;;
        p) process_name=$OPTARG ;;
        o) output_file=$OPTARG ;;
        *) usage ;;
    esac
done

# Check if process name and output file are provided
if [ -z "$process_name" ] || [ -z "$output_file" ]; then
    usage
fi

# Function to collect CPU usage
collect_cpu_usage() {
    ps -C "$process_name" -o %cpu --no-headers
}

# Function to collect RAM usage
collect_ram_usage() {
    ps -C "$process_name" -o %mem --no-headers
}

# Function to collect Disk usage
collect_disk_usage() {
    pid=$(pgrep -f "$process_name")
    if [ -n "$pid" ]; then
        iotop -b -n 1 -p "$pid" | grep "$pid" | awk '{print $10}'
    else
        echo "0"
    fi
}

# Main loop to collect data every 60 seconds
while true; do
    timestamp=$(date +"%Y-%m-%d %H:%M:%S")
    output="$timestamp"

    if [ "$collect_cpu" = true ]; then
        cpu_usage=$(collect_cpu_usage)
        output="$output, CPU: $cpu_usage%"
    fi

    if [ "$collect_ram" = true ]; then
        ram_usage=$(collect_ram_usage)
        output="$output, RAM: $ram_usage%"
    fi

    if [ "$collect_disk" = true ]; then
        disk_usage=$(collect_disk_usage)
        output="$output, Disk: $disk_usage KB/s"
    fi

    echo "$output" >> "$output_file"
    sleep 60
done
