import getImage from '@/assets/index.server'

const {
    Career_A_Committed_Team,
    Career_Amazing_Location,
    Career_Professional_Growth,
    Career_Not_Just_Work
} = getImage('career')

const career_includes = [{
        "id": "career-committed-team",
        "img": {
            "src": Career_A_Committed_Team,
            "alt": "career-committed-team"
        }
    },
    {
        "id": "career-amazing-location",
        "img": {
            "src": Career_Amazing_Location,
            "alt": "career-amazing-location"
        }
    },
    {
        "id": "career-professional-growth",
        "img": {
            "src": Career_Professional_Growth,
            "alt": "career-professional-growth"
        }
    },
    {
        "id": "career-not-just-work",
        "img": {
            "src": Career_Not_Just_Work,
            "alt": "career-not-just-work"
        }
    }
]

export default career_includes