/** @jsxImportSource react */
import { qwikify$ } from "@builder.io/qwik-react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@mui/material";

interface MediaCardProps {
    title: string;
    description: string;
    image: string;
    url: string;
    onClick ?: () => void;
}

function MediaCard(props:MediaCardProps) {
    
    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://v5-0-6.mui.com/static/images/cards/contemplative-reptile.jpg"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {props.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {props.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => {
                        window.open(props.url, '_blank');
                    }}>Share</Button>
                    <Button size="small" onClick={props.onClick}>Learn More</Button>
                </CardActions>
            </Card>
        </>
        
    );
}

export const QMediaCard = qwikify$(MediaCard, { eagerness: 'hover' });