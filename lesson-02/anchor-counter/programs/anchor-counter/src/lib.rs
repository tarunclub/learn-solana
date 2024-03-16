use anchor_lang::prelude::*;

declare_id!("9gAhhkLjGeKyb2NGPF4rU6WRbrXotVzZPfqq4pvmbRJ7");

#[program]
pub mod anchor_counter {
    use super::*;

    pub fn instruction_one(ctx: Context<InstructionAccounts>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count = 0;
        msg!("Counter Account Created ✅");
        msg!("Current Count: {counter.count}");
        Ok(())
    }

    pub fn instruction_increment(ctx: Context<IncrementAccounts>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count += 1;
        msg!("Counter incremented ✅");
        Ok(())
    }

    pub fn instruction_decrement(ctx: Context<DecrementAccounts>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count -= 1;
        msg!("Counter decrement ✅");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InstructionAccounts<'info> {
    #[account(init, payer = user, space = 8 + 8)]
    pub counter: Account<'info, Counter>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct IncrementAccounts<'info> {
    #[account(mut)]
    pub counter: Account<'info, Counter>,
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct DecrementAccounts<'info> {
    #[account(mut)]
    pub counter: Account<'info, Counter>,
    pub user: Signer<'info>,
}

#[account]
pub struct Counter {
    pub count: u64,
}