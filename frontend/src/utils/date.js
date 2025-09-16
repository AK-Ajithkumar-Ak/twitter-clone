
export const formatPostDate= (createdAt)=>{
    const currentDate= new Date()
    const createdAtDate = new Date(createdAt)
    // console.log("currentDate: ", currentDate);
    // console.log("createdAtDate: ", createdAtDate);
    
    const timeDifferenceInSeconds = Math.floor((currentDate- createdAtDate)/1000)
	const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds/ 60)
	const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes/ 60)
	const timeDifferenceInDays= Math.floor(timeDifferenceInHours/ 24)

    // console.log(currentDate- createdAtDate);
    // console.log(timeDifferenceInSeconds);
    // console.log(timeDifferenceInMinutes);
    // console.log(timeDifferenceInHours);
    // console.log(timeDifferenceInDays);
    
    if (timeDifferenceInDays>1) {
        return createdAtDate.toLocaleDateString("en-US", {month: "short", day:"numeric"})
    }else if (timeDifferenceInDays ===1) {
        return "1d"
    }else if (timeDifferenceInHours >=1) {
        return `${timeDifferenceInHours}h`
    }else if (timeDifferenceInMinutes >=1) {
        return `${timeDifferenceInMinutes}m`
    }else{
        return "just now"
    }
}

// let result = formatPostDate("2024-12-15T10:09:28.636+00:00")
// let result2 = formatPostDate("2024-08-03T10:15:19.385+00:00")
// console.log(result);
// console.log(result2);

export const formatMemberSinceDate= (createdAt)=>{
    const date= new Date(createdAt)
    const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",];
    // console.log(date.getDate());
    // console.log(date.getMonth());
    // console.log(date.getFullYear());
    
    const month= months[date.getMonth()]    // index number
    const year= date.getFullYear()
    return `joined ${month} ${year}`
}

// let result3= formatMemberSinceDate("2023-02-18T10:15:19.385+00:00")
// console.log(result3);
