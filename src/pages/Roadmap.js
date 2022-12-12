import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const MainContainer = styled((props) => <Box component="main" {...props} />)(
    ({ theme }) => ({
        height: "calc(100vh - 14.8rem)",
        overflow: "hidden",
    })
);

export default function Roadmap(props) {
    return (
        <MainContainer>
            <iframe
                src="https://viewer.diagrams.net/?tags=%7B%7D&target=blank&highlight=0000ff&edit=_blank&layers=1&nav=1&title=roadmap%20copy.xml#R5V1bd5u4Fv41fhyWLkiIxzRpO7NWL1knZzpzzhuxZVstRl6y3MT99SMw2ICJIxtiGSYPSdgYjLT1bX37IjHCt4vnjypazj%2FLCY9HCEyeR%2FhuhBAi0PxOBZutgAXBVjBTYrIVgb3gQfziWyEspGsx4atcthVpKWMtllXhWCYJH%2BuKLFJKPlU%2FNpXxpCJYRjN%2BIHgYR%2FGh9C8x0fNcCgHYn%2Fidi9k8%2F2pG8hOLqPhwLljNo4l8Konw%2BxG%2BVVLq7X%2BL51sep31X7ZcPL5zdPZjiiba54Psdmn%2B5JR9%2F%2Bf%2BHiZrds2%2Fi%2Frf8Lj%2BjeJ03%2BFYulmvNlZE%2BjAVPxjx%2FfL0p%2BsTc13S%2FOXg3FXF8K2OpshOYRgBMp0a%2B0kr%2B4KUzJPJDjtMrZKJL8mn2s7ui6GLTOe8O21c8LFeaP5dEeXs%2FcrngWm3MR4qzAc47Px99xeFTSZWIeTQfk%2FOSIv38o1E%2BgGa7u%2B%2F72PyTd%2FMJXY4a%2BvMxGxhpw4QZeqbxps1q87eRAQ%2BFxfH%2FsmOAgkJwl7YT7I425aN7roR5YK5y4emqOkElK7lWY36k0TiHbqRmXB%2FrnPyGfFKB5aGGFY8jLX5WUXqCrv5ccfX18XtqMhCIo0djtbbDP4rH63i92t4wFsmPrXyu9XKEb9LboQ%2FrxKhpsfRkYj5g8PFhHGk%2Bk%2BkXfhDJVJo%2F%2BRMdHQm41LR85JRGhZLrZMLT62EPkEZY6IUhw4z5DEIf%2BBXcsUPcFaIy5vDpmDOHJVWeAEP%2FwPLZ4NItiooJ8DUUYccguoln%2FFFFbTGELTBEB4ShkBjrDmBIqY8ZCjG5dgwFA8YQvRCG7HqanUgaICU11oDxOayBPwv9dw6f9P%2FtzUh%2BtL9TelDcyK1%2Bw74wjXslH6NHEQudfssIUWMNs5aDB22%2BcGW0ehEWEg7IgvqEeSysmE3oN3B%2BAj0IG2wnuZztLBzcXhlPWxofOsbWH2b4K%2BOBC5mYE%2F8xdxHcdHRrQmKDJ1hua%2B8BVSMhCAUeOcQTbiIilwQT6iGYbGcqeKmZyrKv8YlcpMpEXmMhOeEAXkBKnANeMeOAvqUifdeU406sxsqwOyP9HOk5Ty1ke5Lh2xhFf0BGkbCaUSQNFKPRJF7QN4OkhybRll8UkLsSk8iCw641T%2FaQHyYySYPl1UEulZ7LmUyi%2BJOUy1z4nWu9yZMg0VpLI5rrRVwYwFJQ%2BDSjem16htRS0exSbvhLJvO%2Fc54ZOyCn5tc2OZLzynZWk9pYzSFFt3BYy8U0OWaIeIQ6NpznRbX2xAUNjrjAzlGYX3ovRaJHL%2Bfrdmng4h7bNuWX1XS%2Fe46T8j37dGeWwO6ADxXj5fgoYwOCdkCqavObCBFyTYjCHhIi23kSsusiRPCga7tkP%2F0mP7s6lqv3Fz9H43lm5cAnHqlEJLPWtpFY2MZKM3tvG33fw9Vs%2BK4kqGIeoYexWwtZGMRBWkjn%2BZ6S75BGoqvVVecjygpQA6o0QSCgHn01NQ7xFeCpjzUm1ni6VJGJZV8Tm649l0M4JgzuWOALfhqt11WyGqy2j3qGn2bJL%2F1Dbb9FwO1fN4KKyPbbe%2FqoOoIoRR7EGAMQMIhIR6PpxURIpKN0CtZqPdZrxVv7%2FIHNLDykaB6tTcGN0Tzg2OVHbUN5J%2BQgzw7O9yQGiC4VA2SgNregy84t6NRau6BH6sa2sYfu1d2O3oUnKoUyVtGKB8hZBZB9Udd11YgURt4eQ35QVtdvQ9fXxWp6jlSfzlS0WGQxPfAuWnVRbcosWBAeVHAPh17Iwt0Pq8xcYQMl8s3Ibqo8vSArwn0M81kvfXENrIfNSvOFwRKoQKwlskIbZA0ryud79dLTpigf9nzmGE59jPJZT1TY9VqyUoL%2BC9dPUv1oP0%2FZxMy35cvDQBMM%2FVpdRROWoGNvHdNBA6nzyNqpE5Oc6ifTQiN9n8wMNgxz7iChC2ywFAwHSwZMVSzBpuyT62IXzAaNpcAxlm5Mj03FWGSJ3D8Sne6IMesim4ts1jzjAS3Z26%2FPK%2BDUtEcHRl4xgJ3tF9DL9XrWiHK9Yu%2BO8%2BWowzojm0Up%2FpBCEWEtbN5Ygwl850URfh%2BjD9Y4cl6y93XJlblxFtXbhSJaukvIBksDcpf29K1wl5ooHqDusdRLj8l2kZfv2mMqhR5u1HguNM%2BKBUbV3Rq%2BqlmUiF%2BdLAoq0gLHtT4kb%2Bowzuc3gM3AyqOO1wX5fXSpCgy9DjbXLtV9pKI4zjaP3OKui7C5jTflD8ibgiHzPRbsE1LVvVAwbQxVeAVbdgUt0kffyh5azn0rYdotHs1UNumQFdp4WGRAHhYC9VVu8AoDf6SP7pU1lIhr96q8Oy4fr9Xh5l23arPUaeJ3Od%2B0xpjNInFyStp3WZTLPCyjcTrDnls1c1nooVqQEDcEN5DralPSx0SwPfRcJ4LTmu3HaNW%2BVhvaFGuTAcUzIAXp5rw0NA9AIQhptUypKVLoemdR0sfIhvUqC%2BI6slHKBd%2FxnzyWywXPq6nbBN1tohdkSNELBAKvVvTXyApdbwZFzotd7BdC9GVLE%2Fvp7FLxDjsF0fM84B7ulldkSF7XkGu3ucT1v4lVB9FdZEM86IBc5qbND0hT6Zlr6k7P85p7uOeTNfyoa1f7nUhzmNuVmi1xZ7MugQ6oehoS5h8h%2FE0QdE346XnOcz%2BXYxNblkI7d7rzS%2BuLLv3agv6g%2FvqjN1uC3c0uKMX6wONjbEg%2BPUbICxikEIIM4hX1Nb3oyjnC%2B%2BjSh7ZAde3R53D6LLqoniuGxXF9DsiRhxhmr97ZoanKWTG4Qjj1sRyBWk98rssRvkR6rbLy7k9RMlunb4nMVvSN%2BWrVRX2qVWZnUJUJ4GDbrkZXMHgzXB15W5lUQs8XqbvBV2KWvjOknNK7SaJ4sxKtEw82bggbEkchcL%2Bdc32nqLLOqWNbGjaYzrfdv73fO5gy20RHsVTqSrY5KJnyYl%2F3doi28TrYkLZ9wrDqJzZmO1jqmVzaiqfRWhFz1T49bEN%2BQzAkpdaXjjSuaHzLnfmNaP8i7G1MYf82cfz%2BHw%3D%3D"
                title="cs-roadmap"
                frameBorder={0}
                allowFullScreen={true}
                width="100%"
                height="100%"
            />
        </MainContainer>
    );
};