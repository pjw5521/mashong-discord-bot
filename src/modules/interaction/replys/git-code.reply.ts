import { Injectable, Inject } from '@nestjs/common';
import { Client, SlashCommandBuilder } from 'discord.js';
import { DISCORD_CLIENT } from 'src/constant/discord';
import { Octokit } from '@octokit/rest';
import { InteractionReply } from './reply';
import { SetCommand } from 'src/decorator/command.decorator';
import DiscordInteraction from 'src/domains/discord/interaction';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GitCodeReply implements InteractionReply {
    
    private readonly octokit: Octokit;
    dict = {};

    constructor(
        private readonly configService: ConfigService) {
        this.octokit = new Octokit();
        
    }
    
    // -> custom 데코레이터는 class 로드될 때 
    @SetCommand()
    command() {
        return new SlashCommandBuilder()
            .setName('code')
            .setDescription('get user git code info test')
            .addStringOption((option) => {
                return option.setName('user-name')
                    .setDescription('name of user')
                    .setRequired(true);
        });
    }
    
    async send(interaction : DiscordInteraction) {
        
        const id = interaction.options.getString('user-name');
        console.log("id : " + id);
        await interaction.deferReply();
        
        const res = await this.octokit.request('GET /users/{id}/repos', {
            id: id,
            headers: {
                Authorization: `token ${this.configService.get('githubToken')}`,
                'X-GiHub-Api-Version': '2022-11-28'
            }
        });
        
        for (var i = 0; i < res.data.length; i++) {
            const lan = await this.octokit.request('GET {url}', {
                url: res.data[i].languages_url,
                headers: {
                    Authorization: `token ${this.configService.get('githubToken')}`,
                    'X-GiHub-Api-Version': '2022-11-28'
                }
            });
                
            for (var key in lan.data) {
                if (key in this.dict) {
                    this.dict[key] += lan.data[key];
                } else {
                    this.dict[key] = lan.data[key];
                }
            }
        }
        
        // console.log(this.dict);
        var sortable = [];
        for (var name in this.dict) {
            console.log(name);
            sortable.push([name, this.dict[name]]);
        }
        
        sortable.sort(function (a, b) {
            return b[1] - a[1];
        });
        console.log(sortable[0][0]);
        if (!sortable[0][0]){
            await interaction.editReply(`\`${id}\` 님이 사용하신 언어가 없습니다.`);
        } else {
            await interaction.editReply(`\`${id}\` 님이 가장 많이 사용한 언어는  \`${sortable[0][0]}\` 입니다 !`);
        }
        
    }
}